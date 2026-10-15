/* Textile Institution Management System — prototype interactions (no dependencies).
   - Language toggle: elements with data-bn swap their text between English and Bangla.
   - Text size: [data-size] buttons set the root font size.
   - Tabs: [role=tablist] buttons toggle aria-selected and show [data-panel].
   - Toast: [data-toast] shows a prototype message instead of a dead button.
   - Tooltip: [data-tip] shows a floating tooltip.
   - Mobile nav: [data-nav-toggle] toggles #app-sidebar. */
(function () {
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  function applyLang(lang) {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
    document.querySelectorAll('[data-bn]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.textContent);
      el.textContent = lang === 'bn' ? el.getAttribute('data-bn') : el.getAttribute('data-en');
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function applySize(size) {
    var map = { sm: '15px', md: '16px', lg: '18px' };
    document.documentElement.style.setProperty('--root-size', map[size] || '16px');
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-lang],[data-size],[data-toast],[role="tab"],[data-nav-toggle]');
    if (!el) return;
    if (el.hasAttribute('data-lang')) { var l = el.getAttribute('data-lang'); store.set('tims-lang', l); applyLang(l); }
    if (el.hasAttribute('data-size')) { var s = el.getAttribute('data-size'); store.set('tims-size', s); applySize(s); }
    if (el.hasAttribute('data-toast')) { ev.preventDefault(); toast(el.getAttribute('data-toast')); }
    if (el.hasAttribute('data-nav-toggle')) {
      var sb = document.getElementById('app-sidebar');
      if (sb) { var open = sb.getAttribute('data-open') === 'true'; sb.setAttribute('data-open', String(!open)); el.setAttribute('aria-expanded', String(!open)); }
    }
    if (el.getAttribute('role') === 'tab' && el.hasAttribute('data-target')) {
      ev.preventDefault();
      var list = el.closest('[role="tablist"]');
      list.querySelectorAll('[role="tab"]').forEach(function (t) { t.setAttribute('aria-selected', String(t === el)); });
      var scope = document.getElementById(list.getAttribute('data-panels'));
      if (scope) scope.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== el.getAttribute('data-target'); });
    }
  });

  var tip;
  document.addEventListener('mouseover', function (ev) {
    var el = ev.target.closest('[data-tip]');
    if (!el) { if (tip) tip.style.display = 'none'; return; }
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; document.body.appendChild(tip); }
    tip.textContent = el.getAttribute('data-tip');
    tip.style.display = 'block';
  });
  document.addEventListener('mousemove', function (ev) {
    if (tip && tip.style.display === 'block') { tip.style.left = (ev.clientX + 14) + 'px'; tip.style.top = (ev.clientY + 14) + 'px'; }
  });

  applyLang(store.get('tims-lang') || 'en');
  applySize(store.get('tims-size') || 'md');
})();
