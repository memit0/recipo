document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(() => {
                fetch(`/search/?q=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        searchResults.innerHTML = '';
                        if (data.recipes.length === 0) {
                            searchResults.innerHTML = '<p>No recipes found</p>';
                            return;
                        }

                        data.recipes.forEach(recipe => {
                            const recipeElement = document.createElement('div');
                            recipeElement.className = 'search-result-item';
                            recipeElement.innerHTML = `
                                <img src="${recipe.image_url || '/static/myapp/images/default-recipe.jpg'}" alt="${recipe.name}">
                                <div class="search-result-content">
                                    <h3>${recipe.name}</h3>
                                    <p>${recipe.description}</p>
                                </div>
                            `;
                            recipeElement.addEventListener('click', () => {
                                window.location.href = `/recipes/${recipe.id}/`;
                            });
                            searchResults.appendChild(recipeElement);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        searchResults.innerHTML = '<p>Error searching recipes</p>';
                    });
            }, 300); // Debounce for 300ms
        });
    }

    // Favorites functionality
    const favoriteForms = document.querySelectorAll('.favorite-form');
    favoriteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const recipeId = formData.get('recipe_id');
            const button = form.querySelector('button');
            const icon = button.querySelector('.material-icons');

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update button appearance
                    if (data.is_favorite) {
                        button.classList.add('favorited');
                        icon.textContent = 'favorite';
                        button.innerHTML = icon.outerHTML + ' Remove from Favorites';
                    } else {
                        button.classList.remove('favorited');
                        icon.textContent = 'favorite_border';
                        button.innerHTML = icon.outerHTML + ' Add to Favorites';
                    }
                } else {
                    alert('Error updating favorites');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating favorites');
            });
        });
    });
}); 