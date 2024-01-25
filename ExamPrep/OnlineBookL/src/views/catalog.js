import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "../data/books.js";


const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            ${books.length > 0 ? html`
            <ul class="other-books-list">
                ${books.map(book => booksDisplay(book))}
            </ul>` : html`
            <p class="no-books">No books in database!</p > `}
            </section>`

const booksDisplay = (book) => html`
            <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/catalog/${book._id}">Details</a>
                </li>`


export async function catalogPage(ctx) {
    const books = await getAllBooks();
    ctx.render(catalogTemplate(books));
}

