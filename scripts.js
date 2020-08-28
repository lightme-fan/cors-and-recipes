const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = 'https://cors-anywhere.herokuapp.com/'; 
const form = document.querySelector('form.search');
const recipeEl = document.querySelector('.recipes');

async function fetchRecipes(query) {
    const response = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
    const data = await response.json();
    return data;
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    const searchInput = el.query
    fetchAndDisplay(searchInput.value)
}

async function fetchAndDisplay(query) {
    // Turn the form off
    form.submit.desabled = true;
    // Submit the search
    const recipes = await fetchRecipes(query);
    // Turn the form on
    form.submit.desabled = false;
    displayRecipes(recipes.results);    
}

function displayRecipes(recipes) {
    console.log(recipes);
    const html = recipes.map(recipe => {
        return `
        <div class="recipe">
            <h2>${recipe.title}</h2>
            <p>${recipe.ingredients}</p>
            ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}">`}
            <a href="${recipe.href}">View recipe -></a>
        </div>
        `;
    }) 
    console.log(html)
    recipeEl.innerHTML = html.join('');
}
form.addEventListener('submit', handleSubmit);
fetchAndDisplay('pizza');