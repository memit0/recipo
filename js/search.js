document.addEventListener('DOMContentLoaded', () => {
    const recipeData = [
        {
            name: "Sushi",
            category: "asian",
            image: "https://int.japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg",
            url: "recipes/sushi.html"
        },
        {
            name: "Pho",
            category: "asian",
            image: "https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg",
            url: "recipes/pho.html"
        },
        {
            name: "Neapolitan Pizza",
            category: "european",
            image: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg",
            url: "recipes/pizza.html"
        },
        {
            name: "Paella",
            category: "european",
            image: "https://tastesbetterfromscratch.com/wp-content/uploads/2020/04/Paella-7.jpg",
            url: "recipes/paella.html"
        },
        {
            name: "Tacos",
            category: "american",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
            url: "recipes/tacos.html"
        }
    ];

    const searchInput = document.getElementById('recipeSearch');
    const searchResults = document.getElementById('searchResults');
    const categoryLinks = document.querySelectorAll('.menu-content a[data-category]');

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

    // Category functionality
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            const filteredRecipes = recipeData.filter(recipe => 
                recipe.category === category
            );
            displayResults(filteredRecipes);
        });
    });
});