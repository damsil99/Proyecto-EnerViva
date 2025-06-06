document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('acepto');
  const boton = document.getElementById('btn-enviar');

  checkbox.addEventListener('change', function () {
    boton.disabled = !checkbox.checked;
  });
});