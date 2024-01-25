
import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getById } from "../data/music.js";
import { getAllLikes, getUserLikes } from "../data/likes.js";
import { getUserData } from "../util.js";


const detailsTemplate = (album, onDelete, onLike) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${album.likes}</span></div>

          <!--Edit and Delete are only for creator-->
          ${album.canEdit || album.canLike ? html`
          <div id="action-buttons">
          ${album.canEdit ? html`
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            <a href="/catalog/${album._id}/edit" id="edit-btn">Edit</a>` : null}
            ${album.canLike ? html`            
            <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}` : null}
          
          </div>
        </div>
      </section>`

      export async function detailsPage(ctx){

        const id = ctx.params.id;

        const requests = [getById(id), getAllLikes(id)];
        const userData = getUserData();

        if(userData){
            requests.push(getUserLikes(id, userData._id));
        }

        const [album, likes, hasLiked] = await Promise.all(requests);
        album.likes = likes;

        if(userData){
            album.canEdit = userData._id == album._ownerId;
            album.canLike = album.canEdit == false && hasLiked == 0;
        }

        update();

        function update(){
            ctx.render(detailsTemplate(album, onDelete, onLike));

            async function onDelete(){
                const choice = confirm('Are you sure?');

                if(choice){
                    await deleteAlbum(id);
                    ctx.page.redirect('/catalog');
                }
            }

            async function onLike(){
                album.likes++;
                album.canLike = false;
                update();
            }
        }
      }
