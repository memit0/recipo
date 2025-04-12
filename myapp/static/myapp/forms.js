document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const recipeForm = document.getElementById('recipeForm');
    const reviewForm = document.getElementById('reviewForm');
    const ratingInput = document.getElementById('rating');
    const ratingOutput = document.querySelector('output[for="rating"]');
    const recipesTableContainer = document.getElementById('recipesTableContainer');
    const reviewsTableContainer = document.getElementById('reviewsTableContainer');

    // Initialize data from localStorage or empty array if no data exists
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    // Display existing data on page load
    updateRecipesTable();
    updateReviewsTable();

    // Live update rating value when user moves the slider
    ratingInput?.addEventListener('input', (e) => {
        ratingOutput.value = e.target.value;
    });

    /**
     * Validates form inputs and displays error messages
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} - True if form is valid, false otherwise
     */
    const validateForm = (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            // Reset previous validation state
            input.classList.remove('invalid');
            const errorSpan = input.nextElementSibling;
            if (errorSpan?.classList.contains('error-message')) {
                errorSpan.textContent = '';
            }

            // Check HTML5 validation constraints
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('invalid');
                if (errorSpan?.classList.contains('error-message')) {
                    errorSpan.textContent = input.validationMessage;
                }
            }

            // Custom validation for ingredients field
            if (input.id === 'ingredients' && input.value.trim().split('\n').length < 2) {
                isValid = false;
                input.classList.add('invalid');
                errorSpan.textContent = 'Please list at least 2 ingredients';
            }
        });

        return isValid;
    };

    // Handle recipe form submission
    recipeForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(recipeForm)) {
            // Create recipe object from form data
            const recipeData = {
                id: Date.now(), // Use timestamp as unique ID
                name: recipeForm.recipeName.value,
                cuisine: recipeForm.cuisine.value,
                ingredients: recipeForm.ingredients.value,
                cookingTime: recipeForm.cookingTime.value,
                difficulty: recipeForm.difficulty.value,
                date: new Date().toLocaleString()
            };

            // Save to localStorage and update UI
            recipes.push(recipeData);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            updateRecipesTable();
            recipeForm.reset();
            alert('Recipe submitted successfully!');
        }
    });

    // Handle review form submission
    reviewForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(reviewForm)) {
            // Create review object from form data
            const reviewData = {
                id: Date.now(),
                username: reviewForm.username.value,
                email: reviewForm.email.value,
                rating: reviewForm.rating.value,
                review: reviewForm.review.value,
                recommend: reviewForm.recommend.checked,
                date: new Date().toLocaleString()
            };

            // Save to localStorage and update UI
            reviews.push(reviewData);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            updateReviewsTable();
            reviewForm.reset();
            alert('Review submitted successfully!');
        }
    });

    // Real-time validation on input blur
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    /**
     * Updates the recipes table with current data
     * Displays recipe information in a formatted table
     */
    function updateRecipesTable() {
        if (!recipesTableContainer) return;

        const table = `
            <h3>Submitted Recipes</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cuisine</th>
                        <th>Cooking Time</th>
                        <th>Difficulty</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${recipes.map(recipe => `
                        <tr>
                            <td>${recipe.name}</td>
                            <td>${recipe.cuisine}</td>
                            <td>${recipe.cookingTime} mins</td>
                            <td>${recipe.difficulty}</td>
                            <td>${recipe.date}</td>
                            <td>
                                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        recipesTableContainer.innerHTML = table;
    }

    /**
     * Updates the reviews table with current data
     * Displays review information in a formatted table
     */
    function updateReviewsTable() {
        if (!reviewsTableContainer) return;

        const table = `
            <h3>Submitted Reviews</h3>
            <div class="data-table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Recommends</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reviews.map(review => `
                            <tr>
                                <td>${review.username}</td>
                                <td>${review.rating} ⭐</td>
                                <td class="review-text" onclick="toggleReview(this)">${review.review}</td>
                                <td>${review.recommend ? '👍' : '👎'}</td>
                                <td>${review.date}</td>
                                <td>
                                    <button onclick="deleteReview(${review.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        reviewsTableContainer.innerHTML = table;
    }

    // Make delete functions available globally for onclick handlers
    window.deleteRecipe = (id) => {
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        updateRecipesTable();
    };

    window.deleteReview = (id) => {
        reviews = reviews.filter(review => review.id !== id);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        updateReviewsTable();
    };
});

/**
 * Validates a single input field and displays error message
 * @param {HTMLInputElement} input - The input element to validate
 */
function validateInput(input) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan?.classList.contains('error-message')) {
        // Reset previous validation state
        input.classList.remove('invalid');
        errorSpan.textContent = '';

        // Show error if input is invalid
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            errorSpan.textContent = input.validationMessage;
        }
    }
}