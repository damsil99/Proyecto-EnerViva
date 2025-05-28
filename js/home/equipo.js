document.addEventListener('DOMContentLoaded', function () {
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = "flex";
    };

    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = "none";
    };

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.desplegable .submenu');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.desplegable-team .submenu-team');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});