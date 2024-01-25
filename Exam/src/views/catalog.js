import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../data/fruits.js";

const catalogTemplate = (fruits) => html`
<h2>Fruits</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${fruits.length > 0 ? html`
          ${fruits.map(fruit => fruitCard(fruit))}` : html`
          <h2>No fruit info yet.</h2>`}          
        </section>`
         
         

const fruitCard = (fruit) => html`
       <div class="fruit">
            <img src=${fruit.imageUrl} alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
          </div>`

export async function catalogPage(ctx){
    const fruits = await getAllFruits();
    ctx.render(catalogTemplate(fruits));
}
