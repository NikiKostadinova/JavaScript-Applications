import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editAlbum } from "../data/music.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (album, onEdit) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" id="album-singer" .value=${album.singer} placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" .value=${album.album} placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" .value=${album.imageUrl} placeholder="Image url" />
            <input type="text" name="release" id="album-release" .value=${album.release} placeholder="Release date" />
            <input type="text" name="label" id="album-label" .value=${album.label} placeholder="Label" />
            <input type="text" name="sales" id="album-sales" .value=${album.sales} placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>`

export async function editPage(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);

  ctx.render(editTemplate(album, createSubmitHandler(onEdit)));

  async function onEdit({
    singer,
    album,
    imageUrl,
    release,
    label,
    sales
  }) {
    if ([
      singer,
      album,
      imageUrl,
      release,
      label,
      sales]
      .some(f => f == '')) {
      return alert('All fields are required!');
    }

    await editAlbum(id, {
      singer,
      album,
      imageUrl,
      release,
      label,
      sales
    });

    ctx.page.redirect('/catalog/' + id);
  }
}
