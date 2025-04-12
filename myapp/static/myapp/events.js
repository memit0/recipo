document.addEventListener('DOMContentLoaded', () => {
    // Right-click context menu for recipe cards
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const recipeName = card.querySelector('h3').textContent;
            const result = confirm(`Would you like to save ${recipeName} to your favorites?`);
            
            if (result) {
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                favorites.push(recipeName);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`${recipeName} has been added to your favorites!`);
            }
        });
    });

    // Hover effect for ingredient hints
    const ingredientsField = document.getElementById('ingredients');
    if (ingredientsField) {
        ingredientsField.addEventListener('mouseover', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Tip: List each ingredient on a new line';
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
            document.body.appendChild(tooltip);
        });

        ingredientsField.addEventListener('mouseout', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    }

    // Form focus events for accessibility
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            const label = document.querySelector(`label[for="${e.target.id}"]`);
            if (label) {
                label.style.color = '#4a90e2';
            }
        });

        input.addEventListener('blur', (e) => {
            const label = document.querySelector(`label[for="${e.target.id}"]`);
            if (label) {
                label.style.color = '';
            }
        });
    });
});