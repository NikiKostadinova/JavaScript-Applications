import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteBook, getById } from "../data/books.js";
import { getAllLikes, getUserLikes, likeBook } from "../data/likes.js";
import { getUserData } from "../util.js";


const detailsTemplate = (book, onDelete, onLike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: Fiction</p>
                <p class="img"><img src=${book.imageUrl}></p>
                
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${book.canEdit || book.canLike ? html`
                    <div class="actions">
                        ${book.canEdit ? html`
                        <a class="button" href="/catalog/${book._id}/edit">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null}
                    ${book.canLike ? html`
                }   <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
                    ` : null}
                    </div>` : null}
                   
                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">${book.likes}</span>
                    </div>
                   
                
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`

export async function detailsPage(ctx) {

    const id = ctx.params.id;

    const requests = [getById(id), getAllLikes(id)];
    const userData = getUserData();

    if (userData) {
        requests.push(getUserLikes(id, userData._id));
    }

    const [book, likes, hasLiked] = await Promise.all(requests);
    book.likes = likes;

    if (userData) {
        book.canEdit = userData._id == book._ownerId;
        book.canLike = book.canEdit == false && hasLiked == 0;
    }

    update();

    function update() {
        ctx.render(detailsTemplate(book, onDelete, onLike));
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteBook(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        likeBook(id);
        book.likes++;
        book.canLike = false;
        update();
    }
}