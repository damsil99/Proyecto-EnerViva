function calcularPaneles() {
    var consumo = document.getElementById('consumo').value;
    var horasSol = document.getElementById('horasSol').value;
    if(consumo && horasSol) {
        var paneles = consumo * horasSol;
        document.getElementById('resultado').innerText = 'Energía total producida (kJ):' + paneles.toFixed(2) + ' kj.';
    } else {
        document.getElementById('resultado').innerText = 'Por favor, completa todos los campos.';
    }
    }
    