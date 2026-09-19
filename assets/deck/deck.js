/* ===========================================================================
   Engine Deck: Workshop Data Art 2026 — Kerja Saintis, Kerja Seni
   Merender slide, menginjeksi chrome resmi UGM, dan mengelola navigasi.
   Zero-dependency, CORS-safe untuk protokol file:// maupun http server.
   =========================================================================== */

(function () {
  'use strict';

  var slides = window.DECK || [];
  var widgets = window.WIDGETS || {};

  var stage = document.getElementById('stage');
  var deckEl = document.getElementById('deck');
  var navEl = document.getElementById('nav');
  var countEl = document.getElementById('navCount');
  var progressEl = document.getElementById('progress');
  var ovEl = document.getElementById('ov');
  var ovGrid = document.getElementById('ovGrid');
  var menuEl = document.getElementById('menu');
  var menuList = document.getElementById('menuList');
  var notesEl = document.getElementById('notes');
  var notesBody = document.getElementById('notesBody');
  var helpEl = document.getElementById('help');
  var fullEl = document.getElementById('navFull');
  var timerEl = document.getElementById('timer');
  var timerClock = document.getElementById('timerClock');
  var timerBlock = document.getElementById('timerBlock');

  var current = 0;
  var built = [];

  var mediaGerak = window.matchMedia ?
    window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var gerakMinimal = mediaGerak ? mediaGerak.matches : false;

  /* --- Daftar Bab Presentasi ---------------------------------------------- */

  var CHAPTERS = [
    { id: 0, label: 'Pembuka & Konteks', desc: 'Menghidupkan sains, merawat masa depan & refleksi Dies Natalis ke-71' },
    { id: 1, label: 'Paradigma & Tim Inisiator', desc: 'Sains yang memiliki hati, seni berbasis bukti & profil inisiator nasional/CERN' },
    { id: 2, label: 'Rekam Jejak & Karya Dosen', desc: 'Keberhasilan Data Art 2025 di Jogja Gallery & etalase karya riset sivitas MIPA' },
    { id: 3, label: 'Gaung Publik & Tren Global', desc: 'Liputan 10+ media nasional dan kepemimpinan UGM di kancah seni-sains dunia' },
    { id: 4, label: 'Visi 2026: Extending Life', desc: 'Menjaga keberlanjutan hidup di 3 kota: Yogyakarta, Lampung, dan Denpasar Bali' },
    { id: 5, label: 'Program, Anggaran & Sponsorship', desc: 'Ekosistem pameran, rincian RAB Rp 1,97 Miliar & paket kemitraan interaktif' },
    { id: 6, label: 'Nilai Kemitraan & Sinergi Alumni', desc: '4 pilar dampak strategis korporasi & peran kepemimpinan alumni MIPA' },
    { id: 7, label: 'Penutup & Narahubung', desc: 'Ajakan kolaborasi gotong-royong dan kontak resmi kemitraan' }
  ];

  /* --- Agenda Timer Insight Session (15 Menit) ----------------------------- */

  var AGENDA = [
    { at: 0, label: 'Menit 0 · Pembukaan & Sapaan Hangat Alumni MIPA' },
    { at: 2, label: 'Menit 2 · Refleksi Sains Berdampak & Titik Temu Sustainable Life' },
    { at: 4, label: 'Menit 4 · Paradigma Seni Berbasis Data & Sinergi Tokoh Inisiator' },
    { at: 6, label: 'Menit 6 · Rekam Jejak 2025 & Kebanggaan Riset Dosen MIPA' },
    { at: 8, label: 'Menit 8 · Visi "Extending Life" & Tur Akbar 3 Kota (GIK UGM, Lampung, Bali)' },
    { at: 10, label: 'Menit 10 · Ekosistem Program & Transparansi Kebutuhan RAB Rp 1,97 M' },
    { at: 12, label: 'Menit 12 · Paket Kemitraan Sponsorship & 4 Pilar Imbal Balik Korporasi' },
    { at: 14, label: 'Menit 14 · Ajakan Gotong Royong Alumni & Silaturahmi Kolaborasi' }
  ];

  /* --- Membangun DOM Slide ------------------------------------------------ */

  function build(s, i) {
    var wrap = document.createElement('div');
    wrap.className = 'slide-wrap';
    wrap.id = s.id;

    var layout = s.layout || 'content';
    var isDark = s.dark === true || s.theme === 'dark' || layout === 'title' || layout === 'dark' ||
                 layout === 'closing' || layout === 'art';

    var cls = ['slide'];
    if (isDark) {
      cls.push('slide--dark');
    } else {
      cls.push('slide--light');
    }
    if (layout !== 'content' && layout !== 'dark' && layout !== 'light') {
      cls.push('slide--' + layout);
    }

    var html = '';

    /* Header standar untuk slide isi (jika bukan slide khusus seperti title/art) */
    if (layout === 'content' || layout === 'dark' || layout === 'light') {
      var head = '';
      if (s.kicker) head += '<p class="s-kicker">' + s.kicker + '</p>';
      if (s.title) head += '<h2 class="s-h2' + (s.titleSm ? ' s-h2--sm' : '') + '">' + s.title + '</h2>';
      html = html.replace('<!--head-->', head);
      if (html.indexOf(head) === -1) html = head + html;
    }

    html += s.html || '';

    /* Injeksi wadah host widget jika didefinisikan pada slide dan belum ada di HTML */
    if (s.widget && html.indexOf('data-widget') === -1) {
      html += '<div class="s-body"><div class="wg" data-widget="' + s.widget + '"></div></div>';
    }

    /* Nomor Slide Asli PPT di pojok kanan bawah */
    var slideNum = s.num || (i + 1);
    html += '<div class="slide-num">' + slideNum + '</div>';

    /* Catatan Kaki Asli PPT di pojok kiri bawah */
    if (s.footnote) {
      html += '<div class="footnote">' + s.footnote + '</div>';
    }

    wrap.innerHTML = '<section class="' + cls.join(' ') + '" data-title="' +
      (s.title || s.label || '').replace(/<[^>]+>/g, '').replace(/"/g, '&quot;') + '">' +
      html + '</section>';

    koreografi(wrap, layout);
    return wrap;
  }

  /* --- Koreografi Animasi Otomatis (Best Practice UGM Motion Engine) -------- */

  var ANIM_MULAI = 200;   /* isi slide mulai masuk setelah judul & kicker */
  var ANIM_STEP = 55;     /* jeda antar anak tangga (staggered delay) */
  var ANIM_MAKS = 620;    /* batas jeda maksimum agar gerak tetap ringkas & terkendali */
  var ANIM_BARIS = 40;    /* jeda antar baris tabel */

  function punya(el, nama) {
    return !!(el.classList && el.classList.contains(nama));
  }

  /* Wadah tata letak: wadah tidak dianimasikan sebagai satu kesatuan, melainkan
     anak-anaknya yang dianimasikan bertangga. Mendukung class grid resmi, flex container,
     maupun div pembungkus kolom konten murni tanpa latar belakang. */
  function wadah(el) {
    if (!el) return false;
    /* Jika elemen adalah kartu atau poin visual, elemen itu sendiri yang dianimasikan */
    if (punya(el, 'card') || punya(el, 'bar-point')) return false;

    if (el.classList) {
      if (punya(el, 'row') || punya(el, 'col') || punya(el, 'stack') ||
          punya(el, 'grid2') || punya(el, 'grid3') || punya(el, 'grid4') ||
          punya(el, 'col-split') || punya(el, 'col-split--rev') ||
          punya(el, 'stat-row') || punya(el, 'stepper-grid') || punya(el, 'pillar-grid') ||
          punya(el, 'art-showcase') || punya(el, 'art-layout') ||
          punya(el, 'sponsor-tier-grid') || punya(el, 'widget-host')) {
        return true;
      }
    }

    var st = el.getAttribute('style') || '';
    /* Jika elemen membawa latar belakang atau border, ia adalah satu unit visual mandiri */
    if (/background\s*:/i.test(st) || /border\s*:/i.test(st)) return false;

    /* Pembungkus layout murni dengan inline style grid atau flex */
    if (/display\s*:\s*(grid|flex)/i.test(st)) return true;

    /* Div kolom polos tanpa background/border yang membungkus kartu/poin/figur */
    if (el.tagName === 'DIV' && el.children.length > 1) {
      for (var c = 0; c < el.children.length; c++) {
        var ch = el.children[c];
        if (punya(ch, 'card') || punya(ch, 'bar-point') || punya(ch, 'art-figure') ||
            punya(ch, 'stat-row') || ch.tagName === 'DIV' || ch.tagName === 'BLOCKQUOTE') {
          return true;
        }
      }
    }
    return false;
  }

  /* Komponen berulang/deretan (daftar butir, perks, langkah) */
  function deretan(el) {
    if (!el) return false;
    return punya(el, 'bullets') || punya(el, 'steps') ||
      punya(el, 'flow') || punya(el, 'legend') ||
      punya(el, 'tier-perks') || punya(el, 'stat-group') ||
      el.tagName === 'UL' || el.tagName === 'OL';
  }

  function tandai(el, arah, tunda) {
    if (!el || el.hasAttribute('data-anim')) return;
    el.setAttribute('data-anim', arah);
    if (tunda != null) el.style.setProperty('--tunda', Math.round(tunda) + 'ms');
  }

  function koreografi(wrap, layout) {
    var slide = wrap.querySelector('.slide');
    if (!slide) return;

    /* 1. Koreografi Khusus Slide Sampul (layout: 'title') */
    if (layout === 'title') {
      tandai(slide.querySelector('.title-art'), 'pudar', 0);
      tandai(slide.querySelector('.title-kicker'), 'turun', 60);
      tandai(slide.querySelector('.title-h1'), 'naik', 140);
      tandai(slide.querySelector('.title-sub'), 'naik', 260);
      tandai(slide.querySelector('.title-meta'), 'naik', 380);
      return;
    }

    /* 2. Koreografi Khusus Slide Penutup (layout: 'closing') */
    if (layout === 'closing') {
      tandai(slide.querySelector('.closing-art'), 'pudar', 0);
      tandai(slide.querySelector('.closing-content .title-kicker'), 'turun', 60);
      tandai(slide.querySelector('.closing-h2'), 'naik', 140);
      tandai(slide.querySelector('.closing-sub'), 'naik', 240);
      tandai(slide.querySelector('.closing-content .card'), 'tumbuh', 340);
      tandai(slide.querySelector('.closing-content > p:last-child'), 'naik', 440);
      return;
    }

    /* 3. Koreografi Slide Isi Standar */
    tandai(slide.querySelector('.s-kicker'), 'turun', 0);
    tandai(slide.querySelector('.s-h2'), 'naik', 60);
    tandai(slide.querySelector('.footnote'), 'pudar', 500);

    var body = slide.querySelector('.s-body') || slide.querySelector('.art-layout');
    if (!body) return;

    var n = 0;
    function jeda() {
      var t = ANIM_MULAI + n * ANIM_STEP;
      n++;
      return t < ANIM_MAKS ? t : ANIM_MAKS;
    }

    telusuri(body, jeda);
  }

  function telusuri(induk, jeda) {
    var anak = induk.children;
    for (var i = 0; i < anak.length; i++) {
      var el = anak[i];
      if (el.hasAttribute('data-anim')) continue;
      if (el.hasAttribute('data-widget')) { tandai(el, 'tumbuh', jeda()); continue; }
      if (wadah(el) && el.children.length) { telusuri(el, jeda); continue; }
      if (deretan(el) && el.children.length) { deret(el, jeda); continue; }
      if (punya(el, 'tbl') || el.tagName === 'TABLE') { tabel(el, jeda); continue; }

      /* Arah masuk khusus untuk elemen karakteristik Data Art */
      if (punya(el, 'bar-point')) {
        tandai(el, 'kanan', jeda());
      } else if (punya(el, 'art-figure')) {
        tandai(el, 'tumbuh', jeda());
      } else {
        tandai(el, 'naik', jeda());
      }
    }
  }

  function deret(el, jeda) {
    var mendatar = (punya(el, 'flow') && !punya(el, 'flow--stack')) ||
                   (el.tagName === 'UL' && /grid/i.test(el.getAttribute('style') || ''));
    var anak = el.children;
    for (var i = 0; i < anak.length; i++) {
      var arah = mendatar ? 'kanan' : 'naik';
      tandai(anak[i], arah, jeda());
    }
  }

  function tabel(el, jeda) {
    var t = jeda();
    tandai(el, 'naik', t);
    var baris = el.querySelectorAll('tbody > tr');
    for (var i = 0; i < baris.length; i++) {
      tandai(baris[i], 'pudar', t + 100 + i * ANIM_BARIS);
    }
  }

  /* --- Menjalankan Gerak -------------------------------------------------- */

  function siapkanAnimasi() {
    var t = stage.querySelectorAll('[data-anim-tunda]');
    for (var i = 0; i < t.length; i++) {
      t[i].style.setProperty('--tunda', t[i].getAttribute('data-anim-tunda') + 'ms');
    }

    var p = stage.querySelectorAll('.garis-gambar');
    for (var j = 0; j < p.length; j++) {
      var path = p[j];
      if (path.hasAttribute('stroke-dasharray')) continue;
      var panjang;
      try { panjang = path.getTotalLength(); } catch (e) { continue; }
      if (!panjang) continue;
      path.style.strokeDasharray = panjang;
      path.style.strokeDashoffset = gerakMinimal ? 0 : panjang;
      path.dataset.panjang = panjang;
    }
  }

  function pasangAnimasi(i) {
    for (var k = 0; k < built.length; k++) {
      if (k === i) continue;
      var s = built[k].querySelector('.slide');
      if (!s || !s.classList.contains('anim-nyala')) continue;
      s.classList.remove('anim-nyala');
      var g = s.querySelectorAll('.garis-gambar');
      for (var m = 0; m < g.length; m++) {
        if (g[m].dataset.panjang) g[m].style.strokeDashoffset = g[m].dataset.panjang;
      }
    }

    var aktif = built[i].querySelector('.slide');
    if (!aktif) return;
    if (!gerakMinimal) void aktif.offsetWidth;

    aktif.classList.add('anim-nyala');
    var ga = aktif.querySelectorAll('.garis-gambar');
    for (var n = 0; n < ga.length; n++) ga[n].style.strokeDashoffset = 0;
  }

  /* --- Menampilkan Slide -------------------------------------------------- */

  function show(i, initial) {
    if (i < 0 || i >= built.length) return;

    if (!initial && i !== current) teardownWidget(current);

    built[current].classList.remove('is-active');
    current = i;
    built[current].classList.add('is-active');

    pasangAnimasi(current);
    setupWidget(current);

    countEl.textContent = (i + 1) + ' / ' + built.length;
    progressEl.style.width = ((i + 1) / built.length * 100) + '%';

    var note = slides[i].notes;
    notesBody.innerHTML = note || '<span style="opacity:.55">Tidak ada catatan untuk slide ini.</span>';

    Array.prototype.forEach.call(ovGrid.children, function (c) {
      if (c.classList.contains('ov__cell')) c.classList.remove('is-current');
    });
    var cell = ovGrid.querySelector('[data-i="' + i + '"]');
    if (cell) cell.classList.add('is-current');

    if (history.replaceState) history.replaceState(null, '', '#' + slides[i].id);
  }

  function slideFromHash() {
    var h = (location.hash || '').replace('#', '');
    if (!h) return -1;
    for (var i = 0; i < slides.length; i++) if (slides[i].id === h) return i;
    var n = parseInt(h, 10);
    if (!isNaN(n) && n >= 1 && n <= slides.length) return n - 1;
    return -1;
  }

  /* --- Widget Lifecycle --------------------------------------------------- */

  var activeWidget = null;

  function setupWidget(i) {
    var name = slides[i].widget;
    if (!name) return;
    var host = built[i].querySelector('[data-widget]');
    if (!host) return;
    var fn = widgets[name];
    if (typeof fn !== 'function') {
      console.warn('Widget belum terdaftar: ' + name);
      return;
    }
    try {
      activeWidget = { i: i, teardown: fn(host) || null };
    } catch (err) {
      console.error('Widget "' + name + '" error:', err);
      activeWidget = null;
    }
  }

  function teardownWidget(i) {
    if (activeWidget && activeWidget.i === i && typeof activeWidget.teardown === 'function') {
      try { activeWidget.teardown(); } catch (err) { console.error(err); }
    }
    activeWidget = null;
  }

  /* --- Penskalaan Panggung 16:9 Responsif --------------------------------- */

  function fitStage() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.transform = 'scale(' + s + ')';
  }

  /* --- Overview Modal Grid ------------------------------------------------ */

  function buildOverview() {
    var lastChapter = -1;
    slides.forEach(function (s, i) {
      if (s.chapter !== lastChapter) {
        lastChapter = s.chapter;
        var h = document.createElement('div');
        h.className = 'ov__chapter';
        h.textContent = CHAPTERS[s.chapter] ? CHAPTERS[s.chapter].label : 'Lain-lain';
        ovGrid.appendChild(h);
      }
      var cell = document.createElement('div');
      cell.className = 'ov__cell';
      cell.tabIndex = 0;
      cell.setAttribute('role', 'button');
      cell.setAttribute('data-i', i);
      cell.setAttribute('aria-label', 'Slide ' + (i + 1) + ': ' + (s.title || s.label || ''));

      var thumb = document.createElement('div');
      thumb.className = 'ov__thumb';
      thumb.innerHTML = built[i].innerHTML;
      cell.appendChild(thumb);

      var no = document.createElement('span');
      no.className = 'ov__no';
      no.textContent = i + 1;
      cell.appendChild(no);

      cell.addEventListener('click', function () { setOverview(false); show(i); });
      cell.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOverview(false); show(i); }
      });
      ovGrid.appendChild(cell);
    });
  }

  function scaleThumbs() {
    var cells = ovGrid.querySelectorAll('.ov__cell');
    if (!cells.length) return;
    var w = cells[0].clientWidth;
    if (!w) return;
    var s = w / 1280;
    Array.prototype.forEach.call(ovGrid.querySelectorAll('.ov__thumb'), function (t) {
      t.style.transform = 'scale(' + s + ')';
    });
  }

  function setOverview(on) {
    ovEl.classList.toggle('is-open', on);
    if (on) { scaleThumbs(); ovEl.scrollTop = 0; }
  }

  /* --- Menu Bab ----------------------------------------------------------- */

  function buildMenu() {
    CHAPTERS.forEach(function (c) {
      var first = -1;
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].chapter === c.id) { first = i; break; }
      }
      if (first === -1) return;
      var count = slides.filter(function (s) { return s.chapter === c.id; }).length;

      var b = document.createElement('button');
      b.className = 'menu__item';
      b.innerHTML = '<span class="menu__no">' + (first + 1) + '</span>' +
        '<span><b>' + c.label + '</b><span>' + c.desc + ' &middot; ' + count + ' slide</span></span>';
      b.addEventListener('click', function () { setMenu(false); show(first); });
      menuList.appendChild(b);
    });
  }

  function setMenu(on) { menuEl.classList.toggle('is-open', on); }

  /* --- Timer Sesi --------------------------------------------------------- */

  var timerStart = null, timerTick = null, timerPaused = 0;

  function agendaFor(min) {
    var found = AGENDA[0];
    for (var i = 0; i < AGENDA.length; i++) if (min >= AGENDA[i].at) found = AGENDA[i];
    return found;
  }

  function renderTimer() {
    var ms = timerStart ? (Date.now() - timerStart) : timerPaused;
    var total = Math.floor(ms / 1000);
    var min = Math.floor(total / 60);
    var sec = total % 60;
    timerClock.textContent = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
    var a = agendaFor(min);
    timerBlock.innerHTML = '<b>Menit ' + a.at + '+</b> &middot; ' + a.label;
    timerEl.classList.toggle('is-over', min >= 120);
  }

  function timerToggle() {
    if (timerStart) {
      timerPaused = Date.now() - timerStart;
      timerStart = null;
      clearInterval(timerTick);
    } else {
      timerStart = Date.now() - timerPaused;
      timerTick = setInterval(renderTimer, 1000);
    }
    renderTimer();
  }

  function timerReset() {
    clearInterval(timerTick);
    timerStart = null; timerPaused = 0;
    renderTimer();
  }

  /* --- Nav Auto-hide ------------------------------------------------------ */

  var navHide = null;
  function pokeNav() {
    navEl.classList.add('is-visible');
    clearTimeout(navHide);
    navHide = setTimeout(function () { navEl.classList.remove('is-visible'); }, 3000);
  }

  /* --- Fullscreen API ----------------------------------------------------- */

  var fsDidukung = !!(document.documentElement.requestFullscreen);
  if (!fsDidukung && fullEl) fullEl.style.display = 'none';

  function toggleFullscreen() {
    if (!fsDidukung) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  /* --- Boot Engine -------------------------------------------------------- */

  function boot() {
    slides.forEach(function (s, i) {
      var wrap = build(s, i);
      built.push(wrap);
      stage.appendChild(wrap);
    });

    buildOverview();
    buildMenu();
    siapkanAnimasi();
    fitStage();

    var start = slideFromHash();
    show(start === -1 ? 0 : start, true);
    pokeNav();

    /* Event Navigasi Bawah */
    document.getElementById('navPrev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('navNext').addEventListener('click', function () { show(current + 1); });
    document.getElementById('navMenu').addEventListener('click', function () { setMenu(true); });
    document.getElementById('navOv').addEventListener('click', function () { setOverview(true); });
    document.getElementById('navNotes').addEventListener('click', function () { notesEl.classList.toggle('is-open'); });
    document.getElementById('navHelp').addEventListener('click', function () { helpEl.classList.toggle('is-open'); });
    if (fullEl) fullEl.addEventListener('click', toggleFullscreen);

    /* Timer Controls */
    document.getElementById('timerToggle').addEventListener('click', timerToggle);
    document.getElementById('timerReset').addEventListener('click', timerReset);

    /* Dialog Closes on click background */
    [menuEl, helpEl].forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m) m.classList.remove('is-open');
      });
    });

    /* Mouse movement shows nav */
    window.addEventListener('mousemove', pokeNav);

    /* Stage Click Zones: kiri mundur, kanan maju, kecuali klik kontrol interaktif */
    deckEl.addEventListener('click', function (e) {
      if (e.target.closest('button, a, input, select, textarea, kbd, label, .interactive-controls, canvas, .ctl, .btn, .nav, .ov, .menu, .notes, .timer, .help')) {
        return;
      }
      var x = e.clientX;
      var w = window.innerWidth;
      if (x < w * 0.3) show(current - 1);
      else show(current + 1);
    });

    /* Keyboard Shortcuts */
    window.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        if (ovEl.classList.contains('is-open')) { setOverview(false); return; }
        if (menuEl.classList.contains('is-open')) { setMenu(false); return; }
        if (helpEl.classList.contains('is-open')) { helpEl.classList.remove('is-open'); return; }
        if (notesEl.classList.contains('is-open')) { notesEl.classList.remove('is-open'); return; }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        show(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        show(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        show(built.length - 1);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setMenu(!menuEl.classList.contains('is-open'));
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setOverview(!ovEl.classList.contains('is-open'));
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        notesEl.classList.toggle('is-open');
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        timerEl.classList.toggle('is-open');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === '?') {
        e.preventDefault();
        helpEl.classList.toggle('is-open');
      }
    });

    window.addEventListener('resize', function () {
      fitStage();
      if (ovEl.classList.contains('is-open')) scaleThumbs();
    });

    window.addEventListener('hashchange', function () {
      var target = slideFromHash();
      if (target !== -1 && target !== current) show(target);
    });
  }

  window.addEventListener('load', boot);
})();
