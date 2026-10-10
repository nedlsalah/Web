/*! NEDLSALAH — shared site behaviour: language, theme, menu, reveals, scroll,
   back-to-top, cursor, motion switch, contact form. Loaded on every page after js/i18n.js.
   Homepage-only behaviour (typing, services, experience) lives in js/home.js. */
(function () {
  'use strict';
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var i18n = window.NEDL_I18N || { en: {}, ar: {} };
  var fx = root.classList.contains('fx');
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var currentLang = store.get('site-lang') === 'ar' ? 'ar' : 'en';
  var currentTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
  var page = document.body.dataset.page || '';
  var t = function (k) { return (i18n[currentLang] && i18n[currentLang][k] !== undefined) ? i18n[currentLang][k] : (i18n.en[k] !== undefined ? i18n.en[k] : ''); };

  /* ── Word-mask splitting (word level, so Arabic letters stay joined) ── */
  function splitWords(el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var i = 0;
    var walk = function (n) {
      [].slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { f.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            var s = document.createElement('span'); s.className = 'wi'; s.textContent = tok;
            w.style.setProperty('--i', Math.min(i++, 14)); w.appendChild(s); f.appendChild(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) walk(c);
      });
    };
    walk(el);
  }
  var splits = $$('[data-split]');
  function splitAll() {
    if (!fx) return;
    splits.forEach(function (el) {
      var was = el.classList.contains('is-in');
      el.classList.remove('is-in'); splitWords(el);
      if (was) requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-in'); }); });
    });
  }

  /* ── Aria labels that depend on state ── */
  var menuBtn = $('#hamburger'), mmenu = $('#mobileMenu');
  function refreshA11y() {
    var tt = $('#themeToggle');
    if (tt) tt.setAttribute('aria-label', t(currentTheme === 'dark' ? 'aria_light' : 'aria_dark'));
    if (menuBtn) menuBtn.setAttribute('aria-label', t(mmenu.classList.contains('open') ? 'aria_menu_close' : 'aria_menu_open'));
    var ms = $('#motionState');
    if (ms) ms.textContent = t(fx ? 'motion_on' : 'motion_off');
  }

  /* ── Page title (per-language, set by the page builder) ── */
  function applyTitle() {
    var en = $('meta[name="title"]'), ar = $('meta[name="title-ar"]');
    var title = (currentLang === 'ar' && ar && ar.content) ? ar.content : ((en && en.content) || i18n.en.doc_title);
    document.title = title;
  }

  /* ── Language ── */
  var setLanguage = function (lang) {
    currentLang = lang; store.set('site-lang', lang);
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    var dict = i18n[lang] || i18n.en;
    $$('[data-i18n],[data-i18n-html]').forEach(function (el) {
      var k = el.dataset.i18n || el.dataset.i18nHtml;
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    $$('[data-i18n-aria]').forEach(function (el) { if (dict[el.dataset.i18nAria] !== undefined) el.setAttribute('aria-label', dict[el.dataset.i18nAria]); });
    $$('[data-i18n-alt]').forEach(function (el) { if (dict[el.dataset.i18nAlt] !== undefined) el.setAttribute('alt', dict[el.dataset.i18nAlt]); });
    /* Article / legal pages: show only the block matching the language */
    $$('.langblock').forEach(function (b) { b.hidden = (b.lang !== lang); });
    var le = $('.lang-en'), la = $('.lang-ar');
    if (le) le.classList.toggle('on', lang === 'en');
    if (la) la.classList.toggle('on', lang === 'ar');
    applyTitle();
    splitAll(); refreshA11y();
    if (window._typeRestart) window._typeRestart();
    try { window.dispatchEvent(new CustomEvent('ned:lang', { detail: { lang: lang } })); } catch (e) {}
  };

  var setTheme = function (theme) {
    currentTheme = theme; store.set('site-theme', theme); root.dataset.theme = theme;
    var m = $('meta[name=theme-color]');
    if (m) m.content = theme === 'dark' ? '#0d0d0f' : '#F4F1EA';
    refreshA11y();
  };

  /* ── Init language + theme ── */
  setLanguage(currentLang); setTheme(currentTheme);

  var langToggle = $('#langToggle'), themeToggle = $('#themeToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLanguage(currentLang === 'en' ? 'ar' : 'en'); });
  if (themeToggle) themeToggle.addEventListener('click', function () { setTheme(currentTheme === 'dark' ? 'light' : 'dark'); });

  /* Native View Transitions: circular theme reveal, soft cross-fade for language */
  if (fx && document.startViewTransition) {
    var lx = innerWidth - 60, ly = 40;
    addEventListener('click', function (e) {
      if (e.clientX || e.clientY) { lx = e.clientX; ly = e.clientY; }
      else { var r = e.target.getBoundingClientRect(); lx = r.left + r.width / 2; ly = r.top + r.height / 2; }
    }, true);
    var _st = setTheme, _sl = setLanguage;
    setTheme = function (th) {
      root.classList.add('vt-theme');
      var vt = document.startViewTransition(function () { _st(th); });
      vt.ready.then(function () {
        var r = Math.hypot(Math.max(lx, innerWidth - lx), Math.max(ly, innerHeight - ly));
        root.animate({ clipPath: ['circle(0px at ' + lx + 'px ' + ly + 'px)', 'circle(' + r + 'px at ' + lx + 'px ' + ly + 'px)'] },
          { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(function () {});
      vt.finished.finally(function () { root.classList.remove('vt-theme'); });
    };
    setLanguage = function (l) { document.startViewTransition(function () { _sl(l); }); };
  }

  /* ── Mobile menu ── */
  function setMenu(open) {
    if (!menuBtn || !mmenu) return;
    mmenu.classList.toggle('open', open); menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open)); mmenu.setAttribute('aria-hidden', String(!open));
    mmenu.inert = !open;
    var main = $('main'); if (main) main.inert = open;
    var foot = $('.footer'); if (foot) foot.inert = open;
    root.classList.toggle('menu-open', open); document.body.style.overflow = open ? 'hidden' : '';
    refreshA11y();
    if (open) { var first = $('a', mmenu); if (first) first.focus({ preventScroll: true }); }
  }
  if (menuBtn && mmenu) {
    mmenu.inert = true;
    menuBtn.addEventListener('click', function () { var o = !mmenu.classList.contains('open'); setMenu(o); if (!o) menuBtn.focus(); });
    $$('a', mmenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && mmenu.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
    matchMedia('(min-width:901px)').addEventListener('change', function (e) { if (e.matches && mmenu.classList.contains('open')) setMenu(false); });
  }

  /* ── Reveals (works on every page: .rv blocks, [data-r] rows, .sec, split headings) ── */
  if (fx) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in', 'is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    $$('.rv,[data-r],.sec,[data-split]:not(.hero-h1),.about-fig').forEach(function (el) { io.observe(el); });
    var ready = (document.fonts && document.fonts.ready)
      ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })])
      : Promise.resolve();
    ready.then(function () {
      requestAnimationFrame(function () {
        root.classList.add('is-ready');
        var h1 = $('.hero-h1'); if (h1) h1.classList.add('is-in');
      });
    });
  }

  /* ── Scroll: progress, nav surface, active section (home), back-to-top, timeline fill ── */
  var progress = $('#scrollProgress'), back = $('#backTop'), nav = $('#nav'), expList = $('#expList');
  var homeIds = ['hero', 'services', 'work', 'about', 'process', 'experience', 'skills', 'certifications', 'contact'];
  var tick = false;
  function onScroll() {
    tick = false;
    var y = scrollY, h = root.scrollHeight - innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h * 100) : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (back) back.classList.toggle('visible', y > 600);
    if (page === 'home') {
      var cur = 'hero';
      homeIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= innerHeight * 0.35) cur = id;
      });
      $$('.links a').forEach(function (a) {
        var on = (a.getAttribute('href') || '').split('#')[1] === cur;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      if (expList) {
        var r = expList.getBoundingClientRect();
        expList.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height)).toFixed(3));
      }
    }
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll); onScroll();
  if (back) back.addEventListener('click', function () { scrollTo({ top: 0, behavior: fx ? 'smooth' : 'auto' }); });

  /* ── Cursor + magnetic buttons (fine pointers, motion on) ── */
  if (fx && fine) {
    var ring = $('#cur'), dot = $('#curDot');
    if (ring && dot) {
      var x = -99, y = -99, rx = x, ry = y, seen = false;
      addEventListener('pointermove', function (e) {
        x = e.clientX; y = e.clientY;
        if (!seen) { seen = true; rx = x; ry = y; root.classList.add('has-cur'); }
      }, { passive: true });
      document.addEventListener('pointerleave', function () { root.classList.remove('has-cur'); });
      document.addEventListener('pointerenter', function () { if (seen) root.classList.add('has-cur'); });
      var fig = $('.hero-fig'), fimg = fig && $('img', fig);
      var tx = 0, ty = 0, cx = 0, cy = 0, run = false, heroOn = true;
      var hero = $('#hero');
      if (fig && hero) new IntersectionObserver(function (es) {
        heroOn = es[0].isIntersecting;
        if (!heroOn) { tx = 0; ty = 0; kick(); }
      }).observe(hero);
      addEventListener('pointermove', function () {
        if (heroOn && fig) {
          tx = Math.max(-1, Math.min(1, (x / innerWidth - 0.5) * 2));
          ty = Math.max(-1, Math.min(1, (y / innerHeight - 0.5) * 2));
        }
        kick();
      }, { passive: true });
      function kick() { if (!run) { run = true; requestAnimationFrame(loop); } }
      function loop() {
        rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
        cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        if (fimg) {
          var d = root.dir === 'rtl' ? -1 : 1;
          fimg.style.transform = 'translate(' + (cx * 3 * d).toFixed(2) + '%,' + (cy * 3).toFixed(2) + '%) rotate(' + (cx * 1.2 * d).toFixed(2) + 'deg) scale(1.07)';
        }
        var busy = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 || Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002;
        if (busy) requestAnimationFrame(loop); else run = false;
      }
      document.addEventListener('pointerover', function (e) {
        var el = e.target, s = '';
        if (el.closest('.btn')) s = 'btn';
        else if (el.closest('.svc-btn')) s = 'row';
        else if (el.closest('a,button,.cert,.sk-items li,.wk-card')) s = 'link';
        else if (el.closest('.hero-fig,.about-fig,.wk-shot')) s = 'img';
        else if (el.closest('.statement,.cta-desc,.lead,.exp-item p,.art-lead')) s = 'text';
        if (s) ring.dataset.s = s; else delete ring.dataset.s;
        if (s === 'row') ring.dataset.l = t('cur_explore');
      });
      $$('.btn').forEach(function (b) {
        b.addEventListener('pointermove', function (e) {
          var r = b.getBoundingClientRect();
          b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.22) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.3) + 'px';
        });
        b.addEventListener('pointerleave', function () { b.style.translate = ''; });
      });
    }
  }

  /* ── Motion switch: overrides the OS setting when the visitor asks ── */
  var mt = $('#motionToggle');
  if (mt) {
    mt.setAttribute('aria-pressed', String(fx));
    mt.addEventListener('click', function () { store.set('site-motion-v2', fx ? 'off' : 'on'); location.reload(); });
  }

  refreshA11y();
  window.__ok = true;
})();
