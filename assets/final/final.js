/* TIMS final prototype — cross-page demo state and flow behaviour.
   Works with ghi.js (language, tabs, dialogs, filters, attendance register).
   State lives in localStorage ("tims-proto-v1"); "Reset demo data" restores the defaults. */
(function () {
  'use strict';
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var KEY = 'tims-proto-v1';
  var DEFAULTS = {
    cand: 'none', att: 'due', res: 'entry', req: 'none', bud: 'none', exp: 'none', asset: 'none', proc: 'none', rep: 'none',
    leave: 'none', cert: 'none', lic: 'none', org: 'none', orgpaid: 'no', lib: 'issued', mig: 'pending', pay: 'due', eval: 'open', rrep: 'none'
  };
  var mem = {};
  function load() { try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return Object.assign({}, DEFAULTS, mem); } }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable: keep in memory */ } }
  var S = load();
  var pick = function (pair) { var p = String(pair).split('|'); return html.dataset.lang === 'bn' ? (p[1] || p[0]) : p[0]; };
  var toast = function (m) { if (window.timsToast) window.timsToast(m); };

  function test(cond) {
    return cond.split('&').every(function (c) {
      var p = c.split('='); var vals = (p[1] || '').split('|');
      return vals.indexOf(String(S[p[0].trim()])) > -1;
    });
  }
  function render() {
    $$('[data-when]').forEach(function (el) { el.hidden = !test(el.getAttribute('data-when')); });
    $$('[data-when-not]').forEach(function (el) { el.hidden = test(el.getAttribute('data-when-not')); });
    $$('[data-state-pressed]').forEach(function (el) { el.setAttribute('aria-pressed', String(test(el.getAttribute('data-state-pressed')))); });
    /* record counts and filters follow the rows the current state shows */
    $$('[data-table-count]').forEach(function (c) { filterTable(c.getAttribute('data-table-count')); });
    html.classList.add('ts-ready');
  }
  function setState(str) {
    if (!str) return;
    str.split(';').forEach(function (kv) { var p = kv.split('='); if (p[0] && p[0] !== '_') S[p[0].trim()] = (p[1] || '').trim(); });
    save(S); render();
  }
  window.timsState = { get: function () { return S; }, set: setState, reset: function () { S = Object.assign({}, DEFAULTS); save(S); render(); } };

  function perform(el) {
    setState(el.getAttribute('data-set'));
    var tm = el.getAttribute('data-after-toast'); if (tm) toast(tm);
    var go = el.getAttribute('data-after-go'); if (go) setTimeout(function () { location.href = go; }, tm ? 700 : 0);
  }

  /* ---------- confirm dialog ---------- */
  var pending = null;
  document.addEventListener('click', function (e) {
    var el = e.target.closest('button[data-set], a[data-set], button[data-confirm], a[data-confirm]');
    if (el && !el.disabled) {
      e.preventDefault();
      if (el.hasAttribute('data-confirm')) {
        pending = el; var dlg = $('#dlg-confirm');
        $('[data-confirm-title]', dlg).textContent = pick(el.getAttribute('data-confirm'));
        $('[data-confirm-text]', dlg).textContent = el.hasAttribute('data-confirm-text') ? pick(el.getAttribute('data-confirm-text')) : '';
        $('[data-confirm-note]', dlg).hidden = !el.hasAttribute('data-confirm-reason');
        dlg.showModal();
      } else perform(el);
    }
    if (e.target.closest('[data-confirm-ok]') && pending) { var p = pending; pending = null; $('#dlg-confirm').close(); perform(p); }
    if (e.target.closest('[data-reset-state]')) { window.timsState.reset(); toast('Demo data reset. All flows start again.|ডেমো তথ্য রিসেট হয়েছে। সব ফ্লো নতুন করে শুরু।'); }
  });

  /* ---------- validation ---------- */
  function check(scope) {
    var ok = true, first = null;
    $$('input, select, textarea', scope).forEach(function (inp) {
      if (inp.closest('[hidden]') && inp.closest('[hidden]') !== scope) return;
      var fld = inp.closest('.fld'); var v = (inp.type === 'checkbox') ? (inp.checked ? 'on' : '') : inp.value.trim(); var bad = false;
      if (inp.required && !v) bad = true;
      if (!bad && v && inp.hasAttribute('data-max') && Number(v) > Number(inp.getAttribute('data-max'))) bad = true;
      if (!bad && v && inp.hasAttribute('data-min') && Number(v) < Number(inp.getAttribute('data-min'))) bad = true;
      if (!bad && v && inp.hasAttribute('data-pattern') && !new RegExp(inp.getAttribute('data-pattern'), 'i').test(v)) bad = true;
      if (fld) { if (bad) fld.setAttribute('data-invalid', ''); else fld.removeAttribute('data-invalid'); var er = $('.err', fld); if (er) er.hidden = !bad; }
      if (bad) { ok = false; if (!first) first = inp; }
    });
    var sum = $('[data-form-error]', scope); if (sum) sum.hidden = ok;
    if (first) first.focus();
    return ok;
  }
  window.timsCheck = check;

  /* ---------- flow forms ---------- */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-flow]')) {
      e.preventDefault();
      if (!check(f)) return;
      var pass = f.querySelector('[name="p"]');
      if (pass && f.hasAttribute('data-login') && pass.value !== 'demo-pass') {
        var le = $('[data-login-error]', f); if (le) le.hidden = false; pass.focus(); return;
      }
      perform(f);
    }
    if (f.matches('[data-lookup]')) {
      e.preventDefault();
      var scope = document.getElementById(f.getAttribute('data-lookup')) || f.parentNode;
      $$('[data-lookup-res]', scope).forEach(function (el) { el.hidden = true; });
      var req = f.getAttribute('data-lookup-require');
      if (req && !test(req)) { var lk = $('[data-lookup-res="locked"]', scope); if (lk) lk.hidden = false; return; }
      if (!check(f)) return;
      var v = $('input', f).value.trim().toUpperCase(); var map = {};
      try { map = JSON.parse(f.getAttribute('data-lookup-map') || '{}'); } catch (x) { map = {}; }
      var key = map[v] || 'none'; var res = $('[data-lookup-res="' + key + '"]', scope); if (res) { res.hidden = false; res.focus && res.setAttribute('tabindex', '-1'); res.focus && res.focus(); }
      setState(f.getAttribute('data-set'));
    }
  });

  /* ---------- stepper ---------- */
  function stepTo(form, i) {
    var steps = $$('.f-stp', form); i = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach(function (s, k) { s.hidden = k !== i; });
    $$('.f-stp-ind li', form).forEach(function (li, k) { li.className = k < i ? 'is-done' : k === i ? 'is-now' : ''; });
    form.dataset.cur = i;
    $$('[data-review]', form).forEach(function (el) {
      var inp = form.querySelector('[name="' + el.getAttribute('data-review') + '"]');
      if (!inp) return;
      var txt = inp.tagName === 'SELECT' ? inp.options[inp.selectedIndex].textContent : inp.type === 'file' ? (inp.files[0] ? inp.files[0].name : el.getAttribute('data-default') || '—') : inp.value;
      el.textContent = txt || '—';
    });
    var top = form.getBoundingClientRect().top + window.scrollY - 90; if (window.scrollY > top) window.scrollTo(0, top);
  }
  document.addEventListener('click', function (e) {
    var nx = e.target.closest('[data-step-next]'); var pv = e.target.closest('[data-step-prev]'); var go = e.target.closest('[data-step-goto]');
    var form = (nx || pv || go) && (nx || pv || go).closest('[data-stepper]'); if (!form) return;
    var cur = Number(form.dataset.cur || 0);
    if (nx) { if (check($$('.f-stp', form)[cur])) stepTo(form, cur + 1); }
    if (pv) stepTo(form, cur - 1);
    if (go) stepTo(form, Number(go.getAttribute('data-step-goto')));
  });

  /* ---------- table search / status filter ---------- */
  function filterTable(id) {
    var tbl = document.getElementById(id); if (!tbl) return;
    var q = $('[data-table-filter="' + id + '"]'); var s = $('[data-table-status="' + id + '"]');
    var qs = q ? q.value.trim().toLowerCase() : ''; var sv = s ? s.value : 'all'; var shown = 0;
    $$('tbody tr', tbl).forEach(function (tr) {
      if (tr.hasAttribute('data-when') && !test(tr.getAttribute('data-when'))) return;
      var ok = (!qs || tr.textContent.toLowerCase().indexOf(qs) > -1) && (sv === 'all' || tr.getAttribute('data-status') === sv);
      tr.hidden = !ok; if (ok) shown++;
    });
    var c = $('[data-table-count="' + id + '"]'); if (c) { c.dataset.liveNum = shown; c.innerHTML = '<span class="l-en">' + shown + '</span><span class="l-bn" lang="bn">' + String(shown).replace(/[0-9]/g, function (x) { return '০১২৩৪৫৬৭৮৯'[x]; }) + '</span>'; }
    var em = $('[data-table-empty="' + id + '"]'); if (em) em.hidden = shown > 0;
  }
  document.addEventListener('input', function (e) { var id = e.target.getAttribute('data-table-filter'); if (id) filterTable(id); });
  document.addEventListener('change', function (e) { var id = e.target.getAttribute('data-table-status'); if (id) filterTable(id); });

  /* ---------- tabs via URL hash, reason pages, query search ---------- */
  function hashTab() {
    var h = location.hash.slice(1); if (!h) return;
    var tab = document.getElementById('tab-' + h);
    if (tab) { tab.click(); setTimeout(function () { tab.scrollIntoView({ block: 'start' }); }, 50); }
  }
  window.addEventListener('hashchange', hashTab);
  var params = new URLSearchParams(location.search);
  var reason = params.get('reason');
  $$('[data-reason]').forEach(function (el) { el.hidden = el.getAttribute('data-reason') !== (reason || 'permission'); });
  /* data-param="key=a|b": shown only when ?key= is one of the values; data-param-not: hidden then. */
  $$('[data-param]').forEach(function (el) { var p = el.getAttribute('data-param').split('='); el.hidden = p[1].split('|').indexOf(params.get(p[0])) < 0; });
  $$('[data-param-not]').forEach(function (el) { var p = el.getAttribute('data-param-not').split('='); el.hidden = p[1].split('|').indexOf(params.get(p[0])) > -1; });
  var q = params.get('q'); var qin = $('[data-filter-q]'); if (q && qin) { qin.value = q; qin.dispatchEvent(new Event('input', { bubbles: true })); }

  /* ---------- file inputs: show chosen name, size check ---------- */
  document.addEventListener('change', function (e) {
    var f = e.target; if (f.type !== 'file') return;
    var fld = f.closest('.fld'); var max = Number(f.getAttribute('data-max-kb') || 0);
    var bad = max && f.files[0] && f.files[0].size / 1024 > max;
    if (fld) { if (bad) fld.setAttribute('data-invalid', ''); else fld.removeAttribute('data-invalid'); var er = $('.err', fld); if (er) er.hidden = !bad; }
  });

  render();
  hashTab();
  document.addEventListener('tims:lang', render);
})();
