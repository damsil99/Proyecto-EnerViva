document.addEventListener('DOMContentLoaded', function () {
  window.openModal = function(id) {
    const modal = document.getElementById(id);
        if (modal) {
      modal.classList.add("mostrar");
    } else {
      console.warn("No se encontró el modal con id:", id);
    }
  }

  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("mostrar");
    }
  }
});