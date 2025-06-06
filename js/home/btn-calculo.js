document.addEventListener("DOMContentLoaded", function() {
    const resultado = document.getElementById('resultado');
    const ahorroKwhSpan = document.getElementById('ahorro-kwh');
    const ahorroCo2Span = document.getElementById('ahorro-co2');
    const ahorroUsdSpan = document.getElementById('ahorro-usd');

    document.querySelectorAll('.btn-calculo').forEach(boton => {
        boton.addEventListener('click', function(){ 
            const form = this.closest('form');
            const consumoInput = form.querySelector('.consumo')
            const consumo = parseFloat(consumoInput.value);

        if(isNaN(consumo) || consumo <= 0){
            alert("Por favor, ingresa un valor válido para el consumo de energía.");
            return;
        }

        const h2 = form.closest('.m-content').querySelector('h2');
        const tipoEnergia = h2.dataset.energia;

        let factorAhorro;
        switch(tipoEnergia){
            case "solar":
                factorAhorro = 0.2;
                break;
            case "biomasa":
                factorAhorro = 0.25;
                break;
            case "hidraulica":
                factorAhorro = 0.3;
                break;
            case "eolica":
                factorAhorro = 0.4;
                break;
            default:
                factorAhorro = 0;
        }

        const ahorroEnergetico = consumo * factorAhorro;
        const reduccionCo2 = ahorroEnergetico * 0.5;
        const ahorroEconomico = ahorroEnergetico * 0.15;

        ahorroKwhSpan.textContent = ahorroEnergetico.toFixed(2);
        ahorroCo2Span.textContent = reduccionCo2.toFixed(2);
        ahorroUsdSpan.textContent = ahorroEconomico.toFixed(2);
        ahorroEconomico.toFixed(2);

        resultado.classList.remove("hidden");

        form.closest(".modal-energia").appendChild(resultado);
        });
    });
});