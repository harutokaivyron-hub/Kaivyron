// Kaivyron — section open/close behavior
// Kisi bhi ".section-toggle" pe click karo -> uska data-target wala panel khulta/band hota hai.
document.querySelectorAll('.section-toggle').forEach(function (el) {
  el.addEventListener('click', function () {
    var panel = document.getElementById(el.getAttribute('data-target'));
    if (!panel) return;
    panel.classList.toggle('show');
    el.classList.toggle('open');
  });
});
