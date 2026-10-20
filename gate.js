// Kaivyron — visitor email gate
// Website kholne se pehle visitor se uska email manga jata hai.
// Email FormSubmit ke through Haruto ke inbox (Kaivyron@proron.me) me pahunchta hai.
// Ek baar unlock = us visit me dobara nahi puchega.
(function () {
  if (sessionStorage.getItem('kv_unlocked') === '1') return;
  var TARGET = 'https://formsubmit.co/ajax/Kaivyron@proron.me';
  document.addEventListener('DOMContentLoaded', function () {
    var ov = document.createElement('div');
    ov.id = 'kv-lock';
    ov.innerHTML = '<div class="kv-lock-box">'
      + '<h1 class="logo small">KAIVYRON</h1>'
      + '<p class="kv-lock-sub">ENTER YOUR EMAIL TO CONTINUE</p>'
      + '<input type="email" id="kv-email" placeholder="Your email address" autocomplete="email" inputmode="email">'
      + '<button id="kv-go">Continue</button>'
      + '<p class="kv-err" id="kv-err"></p>'
      + '</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    var busy = false;
    function err(msg) { document.getElementById('kv-err').textContent = msg; }
    function unlock() {
      sessionStorage.setItem('kv_unlocked', '1');
      ov.remove();
      document.body.style.overflow = '';
    }
    function submit() {
      if (busy) return;
      var em = document.getElementById('kv-email').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { err('Sahi email likho!'); return; }
      busy = true;
      var btn = document.getElementById('kv-go');
      btn.textContent = 'Sending...';
      err('');
      fetch(TARGET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'New visitor on Kaivyron',
          _template: 'table',
          _captcha: 'false',
          name: 'Kaivyron visitor',
          email: em,
          message: 'Ek visitor ne Kaivyron website kholne ke liye apna email diya: ' + em
        })
      }).then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (d) {
          if (d && d.success === 'false') throw new Error(d.message || 'failed');
          unlock();
        })
        .catch(function () {
          busy = false;
          btn.textContent = 'Continue';
          err('Email nahi bheja ja saka. Internet check karke phir try karo.');
        });
    }
    document.getElementById('kv-go').onclick = submit;
    document.getElementById('kv-email').onkeydown = function (e) { if (e.key === 'Enter') submit(); };
    setTimeout(function () { var i = document.getElementById('kv-email'); if (i) i.focus(); }, 400);
  });
})();
