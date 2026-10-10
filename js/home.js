/*! NEDLSALAH — homepage-only behaviour: typed role line, services accordion,
   work filters. Loaded after js/site.js on index.html only. */
(function () {
  'use strict';
  var i18n = window.NEDL_I18N || { en: {}, ar: {} };
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } } };
  var fx = document.documentElement.classList.contains('fx');
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var currentLang = store.get('site-lang') === 'ar' ? 'ar' : 'en';
  window.addEventListener('ned:lang', function (e) { currentLang = e.detail.lang; });

  /* ── Typing role line ── */
  (function typing() {
    var el = document.getElementById('typedText');
    if (!el) return;
    var p = 0, c = 0, del = false, to;
    function tick() {
      var ph = (i18n[currentLang] && i18n[currentLang].phrases) || i18n.en.phrases;
      var cur = ph[p];
      el.textContent = del ? cur.substring(0, --c) : cur.substring(0, ++c);
      var sp = del ? 40 : 90;
      if (!del && c === cur.length) { sp = 2200; del = true; }
      else if (del && c === 0) { del = false; p = (p + 1) % ph.length; sp = 400; }
      to = setTimeout(tick, sp);
    }
    window._typeRestart = function () {
      clearTimeout(to); p = 0; c = 0; del = false;
      if (!fx) { el.textContent = ((i18n[currentLang] && i18n[currentLang].phrases) || i18n.en.phrases).join(' · '); return; }
      el.textContent = ''; tick();
    };
    window._typeRestart();
  })();

  /* ── Services: one open at a time (hover on fine pointers, tap/keyboard elsewhere) ── */
  var svcs = [].slice.call(document.querySelectorAll('.svc'));
  if (svcs.length) {
    var openSvc = function (s) {
      svcs.forEach(function (x) {
        var o = x === s;
        if (o) x.setAttribute('data-open', ''); else x.removeAttribute('data-open');
        var btn = x.querySelector('.svc-btn');
        if (btn) btn.setAttribute('aria-expanded', String(o));
        var body = x.querySelector('.svc-body');
        if (body) body.inert = !o;
      });
    };
    /* Hover intent: layout shifts under a still pointer must not open rows, only real movement + a short rest */
    var px = -1, py = -1, moved = false;
    addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; moved = true; }, { passive: true });
    var _open = function (s) { moved = false; openSvc(s); };
    svcs.forEach(function (s) {
      var btn = s.querySelector('.svc-btn');
      if (btn) btn.addEventListener('click', function () { _open(s); });
      if (fine) {
        var to;
        s.addEventListener('pointerenter', function () {
          clearTimeout(to);
          to = setTimeout(function () {
            var r = s.getBoundingClientRect();
            if (moved && px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) _open(s);
          }, 140);
        });
        s.addEventListener('pointerleave', function () { clearTimeout(to); });
      }
    });
    openSvc(svcs[0]);
  }

  /* ── Work filters (categories with content only) ── */
  (function filters() {
    var bar = document.querySelector('.wk-filters');
    if (!bar) return;
    var cards = [].slice.call(document.querySelectorAll('.wk-card[data-cat]'));
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var f = btn.dataset.filter;
      [].slice.call(bar.querySelectorAll('button[data-filter]')).forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      cards.forEach(function (c) {
        var on = (f === 'all' || c.dataset.cat === f);
        c.hidden = !on;
        if (on) { c.classList.add('in'); }
      });
    });
  })();
})();
