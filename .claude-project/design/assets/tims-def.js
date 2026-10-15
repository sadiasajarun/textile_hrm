/* Textile Institution Management System — D/E/F prototype interactions (no dependencies).
   Attribute API:
   data-lang="bn|en"            language toggle; [data-bn] swaps text, [data-bn-placeholder|aria-label|title] swap attributes, [data-num] gets Bangla digits
   data-size="sm|md|lg"         text size        data-contrast   toggle high contrast
   data-dropdown="#id"          toggle a .menu   data-open="#dialogId"  open a <dialog>   data-close  close nearest dialog
   data-placeholder="Title|route|PRD ref"  open the shared "part of the full build" dialog
   data-toast="message"         prototype feedback
   role=tablist[data-panels=#id] + role=tab[data-target]  tabs
   data-filter="#listId" (input/select with data-key)     live filter of [data-item] rows; [data-empty] shown when none
   form[data-lookup][data-valid="REF"][data-found="#id"][data-notfound="#id"]  demo lookup
   form#login-form[data-accounts="uid=page.html;uid=#dialog"]  demo sign-in (password demo1234)
   ?q=…&key=…                   pre-fills [data-filter] controls on load
   data-reveal="#pw"            show / hide a password field
   #drill=id / #open=dialogId   deep links into a drill-down state or a dialog
   data-drill="divisionId"      Ministry in-place drill-down; [data-drill-panel] blocks
   data-denied="scope name"     permission-denied dialog
   data-mark="P|A|L"            attendance roster toggles inside [data-roster]
   data-show="#id" / data-hide="#id"  reveal or hide elements
   [data-skeleton-for="#id"]    loading skeleton replaced by #id after a short delay */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* unavailable */ } }
  };
  var BN = '০১২৩৪৫৬৭৮৯';
  function toBn(s) { return s.replace(/[0-9]/g, function (d) { return BN[+d]; }); }

  function applyLang(lang) {
    var bn = lang === 'bn';
    document.documentElement.lang = bn ? 'bn' : 'en';
    $$('[data-bn]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.textContent);
      el.textContent = bn ? el.getAttribute('data-bn') : el.getAttribute('data-en');
    });
    ['placeholder', 'aria-label', 'title'].forEach(function (attr) {
      $$('[data-bn-' + attr + ']').forEach(function (el) {
        var key = 'data-en-' + attr;
        if (!el.hasAttribute(key)) el.setAttribute(key, el.getAttribute(attr) || '');
        el.setAttribute(attr, bn ? el.getAttribute('data-bn-' + attr) : el.getAttribute(key));
      });
    });
    $$('[data-num]').forEach(function (el) {
      if (!el.hasAttribute('data-en-num')) el.setAttribute('data-en-num', el.textContent);
      el.textContent = bn ? toBn(el.getAttribute('data-en-num')) : el.getAttribute('data-en-num');
    });
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
  }
  function applySize(size) {
    document.documentElement.style.setProperty('--root-size', { sm: '15px', md: '16px', lg: '18px' }[size] || '16px');
  }
  function toast(msg) {
    var t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2800);
  }
  function openDialog(sel) { var d = $(sel); if (d && d.showModal && !d.open) d.showModal(); return d; }
  function closeMenus(except) { $$('.menu[data-menu]').forEach(function (m) { if (m !== except) { m.hidden = true; var b = $('[data-dropdown="#' + m.id + '"]'); if (b) b.setAttribute('aria-expanded', 'false'); } }); }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-lang],[data-size],[data-contrast],[data-dropdown],[data-open],[data-close],[data-placeholder],[data-toast],[role="tab"],[data-drill],[data-denied],[data-mark],[data-show],[data-hide],[data-nav-toggle],[data-set-filter],[data-profile],[data-reveal]');
    if (!el) { if (!ev.target.closest('.menu')) closeMenus(); return; }
    if (el.hasAttribute('data-lang')) { store.set('tims-lang', el.getAttribute('data-lang')); applyLang(el.getAttribute('data-lang')); }
    if (el.hasAttribute('data-size')) { store.set('tims-size', el.getAttribute('data-size')); applySize(el.getAttribute('data-size')); }
    if (el.hasAttribute('data-contrast')) { var on = document.documentElement.classList.toggle('hc'); store.set('tims-hc', on ? '1' : '0'); el.setAttribute('aria-pressed', String(on)); }
    if (el.hasAttribute('data-dropdown')) {
      ev.preventDefault();
      var m = $(el.getAttribute('data-dropdown'));
      if (m) { var willOpen = m.hidden; closeMenus(m); m.hidden = !willOpen; el.setAttribute('aria-expanded', String(willOpen)); if (willOpen) { var f = m.querySelector('a,button'); if (f) f.focus(); } }
      return;
    }
    if (el.hasAttribute('data-open')) { ev.preventDefault(); closeMenus(); openDialog(el.getAttribute('data-open')); }
    if (el.hasAttribute('data-close')) { ev.preventDefault(); var dl = el.closest('dialog'); if (dl) dl.close(); }
    if (el.hasAttribute('data-placeholder')) {
      ev.preventDefault(); closeMenus();
      var parts = el.getAttribute('data-placeholder').split('|');
      var d = $('#placeholder-dialog');
      if (d) {
        $('[data-ph-title]', d).textContent = parts[0] || '';
        $('[data-ph-route]', d).textContent = parts[1] || '—';
        $('[data-ph-ref]', d).textContent = parts[2] || 'PRD v1';
        var ex = $('[data-ph-extra]', d); ex.textContent = parts[3] || ''; ex.hidden = !parts[3];
        openDialog('#placeholder-dialog');
      }
    }
    if (el.hasAttribute('data-toast')) { ev.preventDefault(); var dlg = el.closest('dialog'); if (dlg && el.hasAttribute('data-close-after')) dlg.close(); toast(el.getAttribute('data-toast')); }
    if (el.getAttribute('role') === 'tab' && el.hasAttribute('data-target')) {
      ev.preventDefault();
      var list = el.closest('[role="tablist"]');
      $$('[role="tab"]', list).forEach(function (t) { t.setAttribute('aria-selected', String(t === el)); t.tabIndex = t === el ? 0 : -1; });
      var scope = $(list.getAttribute('data-panels'));
      if (scope) $$('[data-panel]', scope).forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== el.getAttribute('data-target'); });
    }
    if (el.hasAttribute('data-drill')) {
      ev.preventDefault();
      var id = el.getAttribute('data-drill');
      $$('[data-drill-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-drill-panel') !== id; });
      $$('[data-drill]').forEach(function (b) { if (b.tagName !== 'A' || !b.closest('svg')) b.setAttribute('aria-pressed', String(b.getAttribute('data-drill') === id)); });
      $$('.bd-map [data-drill] path').forEach(function (p) { p.classList.toggle('r-selected', p.parentNode.getAttribute('data-drill') === id); });
      $$('[data-drill-crumb]').forEach(function (c) { c.hidden = c.getAttribute('data-drill-crumb') !== id; });
      var tgt = $('[data-drill-panel="' + id + '"]'); if (tgt && window.innerWidth < 1024) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (el.hasAttribute('data-denied')) {
      ev.preventDefault(); closeMenus();
      var dd = $('#denied-dialog'); if (dd) { $('[data-denied-scope]', dd).textContent = el.getAttribute('data-denied'); openDialog('#denied-dialog'); }
    }
    if (el.hasAttribute('data-mark')) {
      var row = el.closest('[data-roster-row]');
      $$('[data-mark]', row).forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
      var roster = el.closest('[data-roster]');
      if (roster) {
        var counts = { P: 0, A: 0, L: 0 };
        $$('[data-mark][aria-pressed="true"]', roster).forEach(function (b) { counts[b.getAttribute('data-mark')]++; });
        ['P', 'A', 'L'].forEach(function (k) { var c = $('[data-count="' + k + '"]', roster); if (c) c.textContent = counts[k]; });
      }
    }
    if (el.hasAttribute('data-show')) { ev.preventDefault(); el.getAttribute('data-show').split(',').forEach(function (s) { var x = $(s.trim()); if (x) x.hidden = false; }); }
    if (el.hasAttribute('data-hide')) { el.getAttribute('data-hide').split(',').forEach(function (s) { var x = $(s.trim()); if (x) x.hidden = true; }); }
    if (el.hasAttribute('data-set-filter')) {
      ev.preventDefault();
      var sf = el.getAttribute('data-set-filter').split('|');
      var ctl = $('[data-filter="' + sf[0] + '"][data-key="' + sf[1] + '"]');
      if (ctl) { ctl.value = sf[2]; runFilter(sf[0]); }
      $$('[data-set-filter^="' + sf[0] + '|' + sf[1] + '|"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
      $$('.bd-map [data-set-filter] path').forEach(function (p) { p.classList.toggle('r-selected', p.parentNode === el); });
    }
    if (el.hasAttribute('data-profile')) {
      ev.preventDefault();
      var pd = $('#profile-drawer');
      if (pd) {
        ['name', 'code', 'type', 'district', 'division', 'phone', 'programs', 'principal'].forEach(function (k) { var f = $('[data-p="' + k + '"]', pd); if (f) f.textContent = el.getAttribute('data-' + k) || '—'; });
        openDialog('#profile-drawer');
      }
    }
    if (el.hasAttribute('data-reveal')) { var pwf = $(el.getAttribute('data-reveal')); if (pwf) { var show = pwf.type === 'password'; pwf.type = show ? 'text' : 'password'; el.setAttribute('aria-pressed', String(show)); } }
    if (el.hasAttribute('data-nav-toggle')) { var nav = $(el.getAttribute('data-nav-toggle')); if (nav) { nav.hidden = !nav.hidden; el.setAttribute('aria-expanded', String(!nav.hidden)); } }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeMenus();
    var tab = ev.target.closest && ev.target.closest('[role="tab"]');
    if (tab && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) {
      var tabs = $$('[role="tab"]', tab.closest('[role="tablist"]'));
      var i = tabs.indexOf(tab) + (ev.key === 'ArrowRight' ? 1 : -1);
      var next = tabs[(i + tabs.length) % tabs.length]; next.focus(); next.click();
    }
  });

  /* live filter */
  function runFilter(listSel) {
    var list = $(listSel); if (!list) return;
    var ctrls = $$('[data-filter="' + listSel + '"]');
    var shown = 0;
    $$('[data-item]', list).forEach(function (it) {
      var ok = ctrls.every(function (c) {
        var v = (c.value || '').trim().toLowerCase(); if (!v) return true;
        var key = c.getAttribute('data-key');
        if (!key || key === 'text') return (it.getAttribute('data-text') || it.textContent).toLowerCase().indexOf(v) !== -1;
        return (it.getAttribute('data-' + key) || '').toLowerCase() === v;
      });
      it.hidden = !ok; if (ok) shown++;
    });
    var empty = $('[data-empty="' + listSel + '"]'); if (empty) empty.hidden = shown !== 0;
    $$('[data-count-for="' + listSel + '"]').forEach(function (c) { c.textContent = shown; c.removeAttribute('data-en-num'); });
  }
  document.addEventListener('input', function (ev) { var c = ev.target.closest('[data-filter]'); if (c) runFilter(c.getAttribute('data-filter')); });
  document.addEventListener('change', function (ev) { var c = ev.target.closest('[data-filter]'); if (c) runFilter(c.getAttribute('data-filter')); });

  /* forms: lookup demos, login, validation */
  document.addEventListener('submit', function (ev) {
    var f = ev.target;
    if (f.hasAttribute('data-lookup')) {
      ev.preventDefault();
      var input = $('input', f), v = (input.value || '').trim().toUpperCase();
      var ok = v && f.getAttribute('data-valid').split(',').indexOf(v) !== -1;
      var found = $(f.getAttribute('data-found')), nf = $(f.getAttribute('data-notfound'));
      if (found) found.hidden = !ok; if (nf) nf.hidden = ok || !v;
      var fld = f.querySelector('.field'); if (fld) fld.classList.toggle('invalid', !v);
      return;
    }
    if (f.id === 'login-form') {
      ev.preventDefault();
      var uid = $('#uid', f), pw = $('#pw', f), valid = true;
      [uid, pw].forEach(function (i) { var fld = i.closest('.field'); var empty = !i.value.trim(); fld.classList.toggle('invalid', empty); if (empty) valid = false; });
      var err = $('#login-error'); if (err) err.hidden = true;
      if (!valid) return;
      /* data-accounts="user=target;user=#dialog" — the system, not the user, decides the role workspace */
      var accounts = {};
      (f.getAttribute('data-accounts') || '').split(';').forEach(function (pair) { var kv = pair.split('='); if (kv[1]) accounts[kv[0].trim()] = kv[1].trim(); });
      var target = pw.value === 'demo1234' ? accounts[uid.value.trim().toLowerCase()] : null;
      if (target && target.charAt(0) === '#') { var tg = $(target); if (tg && tg.tagName === 'DIALOG') openDialog(target); else if (tg) { tg.hidden = false; tg.focus(); } return; }
      if (target) { window.location.href = target; return; }
      if (err) { err.hidden = false; err.focus(); }
      return;
    }
    if (f.hasAttribute('data-validate')) {
      ev.preventDefault();
      var ok2 = true;
      $$('[required]', f).forEach(function (i) { var fld = i.closest('.field'); var e = !i.value.trim(); if (fld) fld.classList.toggle('invalid', e); if (e) ok2 = false; });
      if (ok2) { var tgt = f.getAttribute('data-validate'); if (tgt.charAt(0) === '#') { var x = $(tgt); if (x) x.hidden = false; f.hidden = true; } else toast(tgt); }
    }
  });

  /* reset buttons clear live filters */
  document.addEventListener('reset', function (ev) {
    setTimeout(function () { var seen = {}; $$('[data-filter]', ev.target).forEach(function (c) { var l = c.getAttribute('data-filter'); if (!seen[l]) { seen[l] = 1; runFilter(l); } }); }, 0);
  });

  /* ?q=…&division=… pre-fills live filters (links from the landing page) */
  try {
    var params = new URLSearchParams(window.location.search);
    params.forEach(function (val, key) {
      var c = key === 'q' ? $('[data-filter]:not([data-key])') : $('[data-filter][data-key="' + key + '"]');
      if (c) {
        c.value = val; runFilter(c.getAttribute('data-filter'));
        $$('[data-set-filter^="' + c.getAttribute('data-filter') + '|' + key + '|"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-filter').split('|')[2] === val)); });
      }
    });
  } catch (e) { /* URLSearchParams unavailable */ }

  /* #drill=<id> opens a drill-down state; #open=<dialogId> opens a dialog (deep links from Institution 360) */
  var hm = window.location.hash.match(/^#(drill|open)=([\w-]+)$/);
  if (hm && hm[1] === 'drill') { var db = $('[data-drill="' + hm[2] + '"]'); if (db) { db.dispatchEvent(new MouseEvent('click', { bubbles: true })); var dp = $('[data-drill-panel="' + hm[2] + '"]'); if (dp) dp.scrollIntoView({ block: 'center' }); } }
  if (hm && hm[1] === 'open') openDialog('#' + hm[2]);

  /* skeletons */
  $$('[data-skeleton-for]').forEach(function (sk) {
    setTimeout(function () { sk.hidden = true; var c = $(sk.getAttribute('data-skeleton-for')); if (c) c.hidden = false; }, 700);
  });

  if (store.get('tims-hc') === '1') document.documentElement.classList.add('hc');
  applySize(store.get('tims-size') || 'md');
  applyLang(store.get('tims-lang') || 'en');
})();
