document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    let isMenuVisible = false;

    const toggleMenu = () => {
        isMenuVisible = !isMenuVisible;
        sideMenu.classList.toggle('active');
        
        // Add fade effect
        if (isMenuVisible) {
            sideMenu.style.opacity = '0';
            sideMenu.classList.add('active');
            setTimeout(() => {
                sideMenu.style.opacity = '1';
            }, 50);
        } else {
            sideMenu.style.opacity = '0';
            setTimeout(() => {
                sideMenu.classList.remove('active');
            }, 300);
        }
    };

    // Click events
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuVisible && 
            !sideMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Add smooth scroll behavior for menu links
    const menuLinks = document.querySelectorAll('.menu-content a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                toggleMenu();
            }
        });
    });
});