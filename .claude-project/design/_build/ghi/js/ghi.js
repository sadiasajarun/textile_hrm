/* TIMS Phase 1 prototype behaviour (Variations G / H / I). No dependencies, works from file://. */
(function () {
  'use strict';
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = function () { return html.dataset.lang === 'bn' ? 'bn' : 'en'; };
  var pick = function (pair) { var p = String(pair).split('|'); return lang() === 'bn' ? (p[1] || p[0]) : p[0]; };
  var store = function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } };
  var BN = '০১২৩৪৫৬৭৮৯';
  var digits = function (s) { return lang() === 'bn' ? String(s).replace(/[0-9]/g, function (d) { return BN[d]; }) : String(s); };

  /* ---------- Language ---------- */
  function applyLang(l) {
    html.dataset.lang = l; html.lang = l;
    $$('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setLang === l)); });
    $$('*').forEach(function (el) {
      var a = el.attributes; if (!a) return;
      for (var i = 0; i < a.length; i++) {
        var name = a[i].name;
        if (name.indexOf('data-i18n-') === 0) {
          var attr = name.slice(10);
          if (attr === 'text') {
            if (!el.hasAttribute('data-en-text')) el.setAttribute('data-en-text', el.textContent);
            el.textContent = l === 'bn' ? a[i].value : el.getAttribute('data-en-text');
            continue;
          }
          if (!el.hasAttribute('data-en-' + attr)) el.setAttribute('data-en-' + attr, el.getAttribute(attr) || '');
          el.setAttribute(attr, l === 'bn' ? a[i].value : el.getAttribute('data-en-' + attr));
        }
      }
    });
    var tt = $('title'); if (tt) document.title = tt.dataset[l] || document.title;
    $$('[data-live-num]').forEach(function (el) { el.textContent = digits(el.dataset.liveNum); });
    document.dispatchEvent(new CustomEvent('tims:lang'));
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (b) { applyLang(b.dataset.setLang); store('tims-lang', b.dataset.setLang); }
    var tg = e.target.closest('[data-toggle-lang]');
    if (tg) { var n = lang() === 'bn' ? 'en' : 'bn'; applyLang(n); store('tims-lang', n); }
    var z = e.target.closest('[data-textsize]');
    if (z) { var v = z.dataset.textsize; if (v === '0') delete html.dataset.size; else html.dataset.size = v; store('tims-size', v); toast('Text size changed|লেখার আকার পরিবর্তিত'); }
  });

  /* ---------- Toast ---------- */
  var tTimer;
  function toast(pair) {
    var el = $('#toast'); if (!el) return;
    el.textContent = pick(pair);
    try { el.hidePopover(); el.showPopover(); } catch (e) { el.style.display = 'block'; }
    clearTimeout(tTimer);
    tTimer = setTimeout(function () { try { el.hidePopover(); } catch (e) { el.style.display = 'none'; } }, 3200);
  }
  window.timsToast = toast;

  /* ---------- Dialogs ---------- */
  function openDlg(id) { var d = document.getElementById(id); if (d && !d.open) d.showModal(); return d; }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); openDlg(o.dataset.open); }
    var c = e.target.closest('[data-close]'); if (c) { var d = c.closest('dialog'); if (d) d.close(); }
    if (e.target.tagName === 'DIALOG') e.target.close();
    var p = e.target.closest('[data-p2]');
    if (p) { e.preventDefault(); var dl = openDlg('dlg-p2'); $('[data-p2-name]', dl).textContent = pick(p.dataset.p2); }
    var ts = e.target.closest('[data-toast]'); if (ts) { e.preventDefault(); toast(ts.dataset.toast); }
    var go = e.target.closest('button[data-go]'); if (go) location.href = go.dataset.go;
  });

  /* ---------- Portal sign-in (dedicated domains) ---------- */
  var portals = {}; try { JSON.parse(($('#portal-data') || {}).textContent || '[]').forEach(function (p) { portals[p.k] = p; }); } catch (e) { /* no data */ }
  var portalTarget = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-portal]'); if (!b) return;
    e.preventDefault();
    var p = portals[b.dataset.portal]; if (!p) return;
    var d = openDlg('dlg-portal');
    $('[data-portal-dom]', d).textContent = p.dom;
    $('[data-portal-name]', d).textContent = lang() === 'bn' ? p.l[1] : p.l[0];
    portalTarget = p.to ? (html.dataset.v.toUpperCase() + '-' + p.to + '.html') : null;
    d.dataset.portalName = p.l[0] + '|' + p.l[1];
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-portal-form]')) {
      e.preventDefault();
      if (portalTarget) { location.href = portalTarget; return; }
      var d = f.closest('dialog'); d.close();
      var pd = openDlg('dlg-p2'); $('[data-p2-name]', pd).textContent = pick(d.dataset.portalName);
    }
  });

  /* ---------- Tabs ---------- */
  function selectTab(tab) {
    var list = tab.closest('[role="tablist"]'); if (!list) return;
    $$('[role="tab"]', list).forEach(function (t) {
      var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls')); if (panel) panel.hidden = !on;
    });
  }
  document.addEventListener('click', function (e) { var t = e.target.closest('[role="tab"]'); if (t) selectTab(t); });
  document.addEventListener('keydown', function (e) {
    var t = e.target.closest && e.target.closest('[role="tab"]'); if (!t) return;
    var tabs = $$('[role="tab"]', t.closest('[role="tablist"]')), i = tabs.indexOf(t);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); i = (i + 1) % tabs.length; }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); i = (i - 1 + tabs.length) % tabs.length; }
    else return;
    tabs[i].focus(); selectTab(tabs[i]);
  });

  /* ---------- Filters (notices) ---------- */
  function runFilter(scope) {
    var on = $('[data-filter][aria-pressed="true"]', scope);
    var cat = on ? on.dataset.filter : 'all';
    var yr = $('[data-filter-year]', scope); var year = yr ? yr.value : 'all';
    var q = $('[data-filter-q]', scope); var qs = q ? q.value.trim().toLowerCase() : '';
    var shown = 0;
    $$('[data-cat]', scope).forEach(function (it) {
      var ok = (cat === 'all' || it.dataset.cat === cat || (cat === 'urgent' && it.dataset.urgent === '1'))
        && (year === 'all' || it.dataset.year === year)
        && (!qs || it.textContent.toLowerCase().indexOf(qs) > -1);
      it.hidden = !ok; if (ok) shown++;
    });
    $$('[data-filter-empty]', scope).forEach(function (el) { el.hidden = shown > 0; });
    $$('[data-filter-count]', scope).forEach(function (el) { el.dataset.liveNum = shown; el.textContent = digits(shown); });
    $$('[data-filter-catname]', scope).forEach(function (el) { el.textContent = on ? on.dataset.name ? pick(on.dataset.name) : '' : ''; });
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-filter]'); if (!c) return;
    var scope = c.closest('[data-filter-scope]');
    $$('[data-filter]', scope).forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.filter === c.dataset.filter)); });
    runFilter(scope);
  });
  document.addEventListener('input', function (e) { if (e.target.matches('[data-filter-q]')) runFilter(e.target.closest('[data-filter-scope]')); });
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-filter-year]')) runFilter(e.target.closest('[data-filter-scope]'));
    if (e.target.matches('[data-filter-select]')) {
      var scope = e.target.closest('[data-filter-scope]');
      $$('[data-filter]', scope).forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.filter === e.target.value)); });
      runFilter(scope);
    }
  });
  document.addEventListener('submit', function (e) { if (e.target.matches('[data-filter-form]')) { e.preventDefault(); runFilter(e.target.closest('[data-filter-scope]')); } });

  /* ---------- Expand / drill-down ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-expand]'); if (!b) return;
    var t = document.getElementById(b.dataset.expand); if (!t) return;
    var open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', String(!open));
    $$('[data-expand-group="' + b.dataset.expand + '"]').forEach(function (r) { r.hidden = open; });
    if (!t.hasAttribute('data-expand-group')) t.hidden = open;
  });

  /* ---------- Simple form validation + demo navigation ---------- */
  function validate(f) {
    var ok = true;
    $$('[required]', f).forEach(function (inp) {
      var fld = inp.closest('.fld'); var bad = !inp.value.trim();
      if (fld) { if (bad) fld.setAttribute('data-invalid', ''); else fld.removeAttribute('data-invalid'); var er = $('.err', fld); if (er) er.hidden = !bad; }
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  }
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-demo-login]')) {
      e.preventDefault(); if (!validate(f)) return;
      if (f.dataset.go) location.href = f.dataset.go;
    }
    if (f.matches('[data-candidate]')) {
      e.preventDefault(); if (!validate(f)) return;
      var r = document.getElementById(f.dataset.candidate); if (r) { r.hidden = false; r.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); r.focus(); }
    }
    if (f.matches('[data-verify]')) {
      e.preventDefault();
      var v = $('input', f).value.trim().toUpperCase();
      var found = $('[data-verify-found]', f.parentNode), nf = $('[data-verify-none]', f.parentNode);
      if (!v) { validate(f); return; }
      found.hidden = v !== 'CERT-2025-00481'; nf.hidden = v === 'CERT-2025-00481';
    }
    if (f.matches('[data-search-demo]')) { e.preventDefault(); toast(f.dataset.searchDemo); }
  });

  /* ---------- Attendance register ---------- */
  function attCount(scope) {
    var p = 0, a = 0, l = 0;
    $$('[data-att-row]', scope).forEach(function (r) { var c = $('input:checked', r); if (!c) return; if (c.value === 'P') p++; else if (c.value === 'A') a++; else l++; });
    $$('[data-att-p]', scope).forEach(function (el) { el.textContent = digits(p); });
    $$('[data-att-a]', scope).forEach(function (el) { el.textContent = digits(a); });
    $$('[data-att-l]', scope).forEach(function (el) { el.textContent = digits(l); });
    return { p: p, a: a, l: l };
  }
  document.addEventListener('change', function (e) { var s = e.target.closest('[data-att-scope]'); if (s) attCount(s); });
  document.addEventListener('click', function (e) {
    var all = e.target.closest('[data-att-all]');
    if (all) { var s = all.closest('[data-att-scope]'); $$('input[value="P"]', s).forEach(function (i) { i.checked = true; }); attCount(s); }
    var sub = e.target.closest('[data-att-submit]'); if (!sub) return;
    var scope = sub.closest('[data-att-scope]'); var c = attCount(scope);
    var total = Number(scope.dataset.total || 60); var present = Math.round(c.p / Math.max(1, c.p + c.a + c.l) * total);
    $$('[data-att-state]').forEach(function (el) {
      el.className = el.className.replace(/tag-\w+/g, '') + ' tag-ok';
      el.innerHTML = '<span class="l-en">Recorded · ' + present + '/' + total + '</span><span class="l-bn" lang="bn">লিপিবদ্ধ · ' + digits(present).replace(/[0-9]/g, function (d) { return BN[d]; }) + '/' + String(total).replace(/[0-9]/g, function (d) { return BN[d]; }) + '</span>';
    });
    $$('[data-att-hide]').forEach(function (el) { el.hidden = true; });
    $$('[data-att-show]').forEach(function (el) { el.hidden = false; });
    var d = sub.closest('dialog'); if (d) d.close();
    toast('Attendance submitted. Principal and Head Office dashboards are updated.|হাজিরা জমা হয়েছে। অধ্যক্ষ ও প্রধান কার্যালয়ের ড্যাশবোর্ড হালনাগাদ হয়েছে।');
  });

  /* ---------- Approve / return rows ---------- */
  var pending = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-row-action]'); if (!b) return;
    var row = b.closest('[data-row]'); var act = b.dataset.rowAction;
    pending = { row: row, act: act };
    var d = openDlg('dlg-confirm');
    var who = row.dataset.row;
    var T = {
      approve: ['Approve ' + who + '?|' + who + ' অনুমোদন করবেন?', 'The applicant is notified and the request moves to the next step.|আবেদনকারীকে জানানো হবে এবং অনুরোধটি পরের ধাপে যাবে।'],
      return: ['Return ' + who + ' for correction?|' + who + ' সংশোধনের জন্য ফেরত পাঠাবেন?', 'Tell the applicant exactly what to fix. The SLA clock pauses until they resubmit.|আবেদনকারীকে ঠিক কী সংশোধন করতে হবে লিখুন। পুনরায় জমা না দেওয়া পর্যন্ত সময়সীমা থেমে থাকবে।'],
      forward: ['Forward ' + who + '?|' + who + ' পরবর্তী স্তরে পাঠাবেন?', 'It moves to the next approval level with your note.|আপনার মন্তব্যসহ এটি পরবর্তী অনুমোদন স্তরে যাবে।'],
    }[act];
    $('[data-confirm-title]', d).textContent = pick(T[0]);
    $('[data-confirm-text]', d).textContent = pick(T[1]);
    $('[data-confirm-note]', d).hidden = act !== 'return';
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-confirm-ok]') || !pending) return;
    var row = pending.row, act = pending.act;
    var st = $('[data-row-status]', row);
    var L = { approve: ['Approved', 'অনুমোদিত', 'tag-ok'], return: ['Returned for correction', 'সংশোধনের জন্য ফেরত', 'tag-warn'], forward: ['Forwarded', 'পাঠানো হয়েছে', 'tag-info'] }[act];
    if (st) st.innerHTML = '<span class="tag ' + L[2] + '"><span class="l-en">' + L[0] + '</span><span class="l-bn" lang="bn">' + L[1] + '</span></span>';
    $$('[data-row-action]', row).forEach(function (x) { x.disabled = true; });
    row.classList.add('row-done');
    $$('[data-count]').forEach(function (c) { var n = Math.max(0, Number(c.dataset.liveNum || c.textContent) - 1); c.dataset.liveNum = n; c.textContent = digits(n); });
    $('#dlg-confirm').close(); pending = null;
    toast(act === 'approve' ? 'Approved. The applicant has been notified.|অনুমোদিত। আবেদনকারীকে জানানো হয়েছে।' : act === 'return' ? 'Returned for correction with your note.|আপনার মন্তব্যসহ সংশোধনের জন্য ফেরত পাঠানো হয়েছে।' : 'Forwarded to the next level.|পরবর্তী স্তরে পাঠানো হয়েছে।');
  });

  /* ---------- Bulk select ---------- */
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-check-all]')) {
      var tbl = e.target.closest('[data-bulk]'); $$('[data-check]', tbl).forEach(function (c) { if (!c.disabled) c.checked = e.target.checked; });
    }
    var tb = e.target.closest('[data-bulk]');
    if (tb) { var n = $$('[data-check]:checked', tb).length; $$('[data-bulk-count]', tb).forEach(function (el) { el.dataset.liveNum = n; el.textContent = digits(n); }); $$('[data-bulk-bar]', tb).forEach(function (el) { el.hidden = n === 0; }); }
  });

  /* ---------- Slideshow ---------- */
  $$('[data-slides]').forEach(function (root) {
    var slides = $$('.slide', root), dots = $$('[data-slide-dot]', root), i = 0, timer;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
    }
    function play() { if (!reduce && root.dataset.playing !== 'false') { clearInterval(timer); timer = setInterval(function () { show(i + 1); }, 7000); } }
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-slide-next]')) { show(i + 1); play(); }
      if (e.target.closest('[data-slide-prev]')) { show(i - 1); play(); }
      var d = e.target.closest('[data-slide-dot]'); if (d) { show(Number(d.dataset.slideDot)); play(); }
      var p = e.target.closest('[data-slide-pause]');
      if (p) { var on = root.dataset.playing !== 'false'; root.dataset.playing = on ? 'false' : 'true'; p.setAttribute('aria-pressed', String(on)); if (on) clearInterval(timer); else play(); }
    });
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', play);
    show(0); play();
  });

  /* ---------- Horizontal scrollers ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-scroll]'); if (!b) return;
    var p = b.dataset.scroll.split('|'), el = document.getElementById(p[0]);
    if (el) el.scrollBy({ left: Number(p[1]) * el.clientWidth * 0.8, behavior: 'smooth' });
  });

  /* ---------- Gallery lightbox ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lightbox]'); if (!b) return;
    var im = $('img', b); var d = openDlg('dlg-lightbox');
    $('[data-lb-img]', d).src = im.src; $('[data-lb-img]', d).alt = im.alt;
    $('[data-lb-cap]', d).textContent = im.alt;
  });

  /* ---------- Division map (Variation H) ---------- */
  var divData = null; try { divData = JSON.parse(($('#div-data') || {}).textContent || 'null'); } catch (e) { divData = null; }
  function showDiv(id) {
    if (!divData) return; var d = divData[id]; if (!d) return;
    $$('[data-map-div]').forEach(function (p) { p.setAttribute('aria-pressed', String(p.dataset.mapDiv === id)); });
    $$('[data-div-field]').forEach(function (el) {
      var k = el.dataset.divField, v = d[k];
      if (Array.isArray(v)) el.innerHTML = '<span class="l-en">' + v[0] + '</span><span class="l-bn" lang="bn">' + v[1] + '</span>';
      else { el.dataset.liveNum = v; el.textContent = digits(v); }
    });
    $$('[data-div-bar]').forEach(function (el) { el.style.width = d.att + '%'; });
  }
  document.addEventListener('click', function (e) { var p = e.target.closest('[data-map-div]'); if (p) showDiv(p.dataset.mapDiv); });
  document.addEventListener('keydown', function (e) { var p = e.target.closest && e.target.closest('[data-map-div]'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showDiv(p.dataset.mapDiv); } });

  /* ---------- Prototype bar ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-vnb-toggle]'); if (!b) return;
    var bar = b.closest('[data-vnb]'); var col = bar.hasAttribute('data-collapsed');
    if (col) bar.removeAttribute('data-collapsed'); else bar.setAttribute('data-collapsed', '');
    b.setAttribute('aria-expanded', String(col)); store('tims-vnb', col ? 'open' : 'closed');
  });
  try { if (localStorage.getItem('tims-vnb') === 'closed') { var bar = $('[data-vnb]'); bar.setAttribute('data-collapsed', ''); $('[data-vnb-toggle]', bar).setAttribute('aria-expanded', 'false'); } } catch (e) { /* storage unavailable */ }

  /* ---------- Mobile menu ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-menu]'); if (!b) return;
    var m = document.getElementById(b.dataset.menu); var open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', String(!open)); m.classList.toggle('is-open', !open);
  });

  applyLang(lang());
  $$('[data-filter-scope]').forEach(runFilter);
})();
