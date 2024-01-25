import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../data/books.js";
import { getUserData } from "../util.js";



const myBookTemplate = (books) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            ${books.length > 0 ? html`
            <ul class="my-books-list">
            ${books.map(book => bookTemp(book))}
            </ul>` : html`
            <p class="no-books">No books in database!</p>`}            
</section>`

const bookTemp = (book) => html`
        <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/catalog/${book._id}">Details</a>
                </li>`;

export async function showMyBooks(ctx) {

   
    const userdata = getUserData();
    const userId = userdata._id
    const books = await getMyBooks(userId);

    ctx.render(myBookTemplate(books));
}
