import { createSubmitHandler, getUserData } from "../util.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSearchedFruit } from "../data/fruits.js";

const searchTemplate = (onSearch, result) => html`
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
 
  <!--If there are matches display a div with information about every fruit-->
${result.length > 0 ? html`
${result.map(fruit => fruitCard(fruit))}` : html`
<p class="no-result">No result.</p>`}
  </div>
        </section>`

const fruitCard = (fruit) => html`
         <div class="fruit">
  <img src=${fruit.imageUrl} alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
</div>`

export async function showSearch(ctx){

    let result = [];
    let user = getUserData();

    async function onSearch({search}){

        if(search == ''){
            return alert('All fields are required!');
        }

        result = await getSearchedFruit(search);

        ctx.render(searchTemplate(createSubmitHandler(onSearch), result, user));
    }

    ctx.render(searchTemplate(createSubmitHandler(onSearch), result, user));
}





