document.addEventListener('DOMContentLoaded', function () {
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = "flex";
    };

    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = "none";
    };
});