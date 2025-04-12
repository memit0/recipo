document.addEventListener('DOMContentLoaded', () => {
    const recipeData = [
        {
            name: "Sushi",
            image: "https://int.japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg",
            url: "/sushi/"
        },
        {
            name: "Pho",
            image: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
            url: "/pho/"
        },
        {
            name: "Neapolitan Pizza",
            image: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg",
            url: "/pizza/"
        },
        {
            name: "Paella",
            image: "https://tastesbetterfromscratch.com/wp-content/uploads/2020/04/Paella-7.jpg",
            url: "/paella/"
        },
        {
            name: "Tacos",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
            url: "/tacos/"
        }
    ];

    const searchInput = document.getElementById('recipeSearch');
    const searchResults = document.getElementById('searchResults');

    function displayResults(recipes) {
        searchResults.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe-item';
            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <span>${recipe.name}</span>
            `;
            recipeElement.addEventListener('click', () => {
                window.location.href = recipe.url;
            });
            searchResults.appendChild(recipeElement);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = recipeData.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredRecipes);
    });
});