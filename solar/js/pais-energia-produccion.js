document.addEventListener("DOMContentLoaded", function () {
    fetch('../data/produccion.json')
        .then(response => response.json())
        .then(data => {
            const paisSelect = document.getElementById("pais2");
            const pais1Select = document.getElementById("pais21");
            const tipoGraficaSelect = document.getElementById("tipo-grafica2");
            const checkbox = document.getElementById("habilita2");
            const canvas = document.getElementById('graficos-energias2');
            let chart = null;

            const Paises = new Map();
            pais1Select.disabled = true;

            checkbox.addEventListener("change", () => {
                pais1Select.disabled = !checkbox.checked;
                tipoGraficaSelect.querySelectorAll("option").forEach(opt => {
                    opt.disabled = false;
                });
                if (checkbox.checked) {
                    tipoGraficaSelect.value = "lineal";
                    tipoGraficaSelect.querySelectorAll("option").forEach(opt => {
                        if (opt.value !== "lineal" && opt.value !== "") {
                            opt.disabled = true;
                        }
                    });
                }
                graficar();
            });

            data.forEach(item => {
                if (!Paises.has(item.Entity)) {
                    Paises.set(item.Entity, item.Code);
                }
            });

            Paises.forEach((codigo, pais) => {
                [paisSelect, pais1Select].forEach(select => {
                    const option = document.createElement("option");
                    option.value = pais;
                    option.textContent = codigo ? `${pais} (${codigo})` : pais;
                    select.appendChild(option);
                });
            });

            ["Lineal", "Barras", "Circular"].forEach(tipo => {
                const option = document.createElement("option");
                option.value = tipo.toLowerCase();
                option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
                tipoGraficaSelect.appendChild(option);
            });

            function graficar() {
                const pais = paisSelect.value;
                const pais1 = pais1Select.value;
                const energia = "Electricity from solar (TWh)";
                const tipo = tipoGraficaSelect.value;

                if (!pais || !energia || !tipo) return;

                const datosPais = data
                    .filter(d => d.Entity === pais)
                    .sort((a, b) => a.Year - b.Year);

                const labels = datosPais.map(d => d.Year);
                const valores = datosPais.map(d => d[energia]);

                const generarColores = cantidad => {
                    const base = [
                        'rgba(255, 99, 132, 0.6)', 
                        'rgba(54, 162, 235, 0.6)', 
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)', 
                        'rgba(153, 102, 255, 0.6)', 
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)', 
                        'rgba(83, 102, 255, 0.6)', 
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(0, 255, 127, 0.6)', 
                        'rgba(0, 128, 255, 0.6)', 
                        'rgba(128, 0, 255, 0.6)',
                        'rgba(255, 128, 0, 0.6)', 
                        'rgba(128, 255, 0, 0.6)', 
                        'rgba(255, 0, 128, 0.6)'
                    ];
                    return Array.from({ length: cantidad }, (_, i) => base[i % base.length]);
                };

                if (chart) chart.destroy();

                const tipoChart = tipo === "lineal" ? 'line' : tipo === "barras" ? 'bar' : 'pie';

                let chartData;
                if (tipoChart === 'pie') {
                    chartData = {
                        labels: labels,
                        datasets: [{
                            label: energia,
                            data: valores,
                            backgroundColor: generarColores(valores.length)
                        }]
                    };
                } else {
                    let datasets = [{
                        label: pais,
                        data: valores,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1
                    }];

                    if (checkbox.checked && pais1) {
                        const datosPais1 = data
                            .filter(d => d.Entity === pais1)
                            .sort((a, b) => a.Year - b.Year);
                        const valores1 = datosPais1.map(d => d[energia]);
                        datasets.push({
                            label: pais1,
                            data: valores1,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.1
                        });
                    }

                    chartData = {
                        labels: labels,
                        datasets: datasets
                    };
                }

                chart = new Chart(canvas, {
                    type: tipoChart,
                    data: chartData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        },
                        scales: tipoChart !== 'pie' ? {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Produccion (TWh)' }
                            },
                            x: {
                                title: { display: true, text: 'Año' }
                            }
                        } : {}
                    }
                });
            }

            [paisSelect, pais1Select, tipoGraficaSelect].forEach(el => {
                el.addEventListener("change", graficar);
            });
        })
        .catch(error => console.error("Error al cargar JSON:", error));
});
