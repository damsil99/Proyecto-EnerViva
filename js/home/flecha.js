document.addEventListener('DOMContentLoaded', function() {
    // Seleciona el contenedor del slider (ul dentro de .slider-box)
    const slider = document.querySelector('.slider-box ul');

    // Cuenta cuántas imágenes hay dentro del slider
    const totalSlider = slider.children.length;

    // Índice del slider empieza en cero
    let sliderIndex = 0;

    // Temporizador
    let interval;

    // Actualiza la posición del slider
    function updateSlide(){
        slider.style.marginLeft = `-${sliderIndex * 100}%`;
    }

    /* Cambia de slide manualmente cuando se hace clic en las flechas 
       [Este es el evento que se dispara al hacer clic en las flechas] */
    function moveSlide(direction){
        sliderIndex += direction;

        // Si va hacia atrás en dirección al primer slide, vuelve al último
        if(sliderIndex < 0) {
            sliderIndex = totalSlider - 1;
        }
        // Si va hacia adelante en dirección al último slide, vuelve al primero
        if(sliderIndex >= totalSlider) {
            sliderIndex = 0;
        }

        // Actualiza la posición del slider
        updateSlide();

        // Reinicia el temporizador
        resetAutoplay();
    }

    // Función que avanza automáticamente el slider
    function autoplaySlide(){
        sliderIndex = (sliderIndex + 1) % totalSlider;
        updateSlide();
    }

    // Inicia el autoplay cada 5 segundos
    function startAutoplay(){
        interval = setInterval(autoplaySlide, 5000);
    }

    // Detiene y reinicia el autoplay
    function resetAutoplay(){
        clearInterval(interval);
        startAutoplay();
    }

    // Expone la función moveSlide para que pueda ser llamada desde el HTML
    window.moveSlide = moveSlide;

    // Iniciar al cargar
    startAutoplay();

});
