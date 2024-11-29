const apiKey = '9d83c2821eb942048ca969d415f2e525';
const recipeContainer = document.querySelector(".recipe-container");
const searchButton = document.querySelector(".search-button");
const ingredientInput = document.querySelector(".ingredient-input");

async function getRecipes(ingredients) {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`);
    const data = await response.json();

    recipeContainer.innerHTML = '';

    if (data.length > 0) {
        data.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}" />
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
            `;

            recipeContainer.appendChild(recipeCard);
        });
    } else {
        recipeContainer.innerHTML = `<p>No recipes found. Try more ingredients!</p>`;
    }
}
searchButton.addEventListener("click", () => {
    const ingredients = ingredientInput.value.trim().replace(/\s+/g, '+');
    if (ingredients) {
        getRecipes(ingredients);
    }
});
