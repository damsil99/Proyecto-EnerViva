document.addEventListener("DOMContentLoaded", function() {
    const btnJulian = document.getElementById('btn-julian');
    const btnLuisa = document.getElementById('btn-luisa');
    const btnDaniel = document.getElementById('btn-daniel');

    btnJulian.addEventListener('click', function() {
        window.location.href = "biografias/julian.html";
    });

    btnLuisa.addEventListener('click', function() {
        window.location.href = "biografias/luisa.html";
    });

    btnDaniel.addEventListener('click', function() {
        window.location.href = "biografias/daniel.html";
    });
});