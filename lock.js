// Kaivyron — site entry lock
// Bina sahi code ke website nahi khulegi. Ek baar unlock = us visit me dobara nahi puchega.
(function () {
  if (sessionStorage.getItem('kv_unlocked') === '1') return;
  document.addEventListener('DOMContentLoaded', function () {
    var ov = document.createElement('div');
    ov.id = 'kv-lock';
    ov.innerHTML = '<div class="kv-lock-box">'
      + '<h1 class="logo small">KAIVYRON</h1>'
      + '<p class="kv-lock-sub">Enter code to continue</p>'
      + '<input type="password" id="kv-code" placeholder="Code" autocomplete="off">'
      + '<button id="kv-go">Unlock</button>'
      + '<p class="kv-err" id="kv-err"></p>'
      + '</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    function tryUnlock() {
      var v = document.getElementById('kv-code').value.trim();
      if (v === '12072012') {
        sessionStorage.setItem('kv_unlocked', '1');
        ov.remove();
        document.body.style.overflow = '';
      } else {
        document.getElementById('kv-err').textContent = 'Galat code!';
      }
    }
    document.getElementById('kv-go').onclick = tryUnlock;
    document.getElementById('kv-code').onkeydown = function (e) { if (e.key === 'Enter') tryUnlock(); };
    setTimeout(function () { var i = document.getElementById('kv-code'); if (i) i.focus(); }, 400);
  });
})();
