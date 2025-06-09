document.addEventListener("DOMContentLoaded", function() {
    const resultado = document.getElementById('resultado');
    const ahorroKwhSpan = document.getElementById('ahorro-kwh');
    const ahorroCo2Span = document.getElementById('ahorro-co2');
    const ahorroUsdSpan = document.getElementById('ahorro-usd');

    document.querySelectorAll('.btn-calculo').forEach(boton => {
        boton.addEventListener('click', function(){ 
            const solar = this.closest('.a-solar');
            const consumoInput = solar.querySelector('.consumo')
            const consumo = parseFloat(consumoInput.value);

        if(isNaN(consumo) || consumo <= 0){
            alert("Por favor, ingresa un valor válido para el consumo de energía.");
            return;
        }

        let factorAhorro = 0.2;

        const ahorroEnergetico = consumo * factorAhorro;
        const reduccionCo2 = ahorroEnergetico * 0.5;
        const ahorroEconomico = ahorroEnergetico * 0.15;

        ahorroKwhSpan.textContent = ahorroEnergetico.toFixed(2);
        ahorroCo2Span.textContent = reduccionCo2.toFixed(2);
        ahorroUsdSpan.textContent = ahorroEconomico.toFixed(2);
        ahorroEconomico.toFixed(2);

        resultado.classList.remove("hidden");
        });
    });
});