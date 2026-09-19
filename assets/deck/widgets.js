/* ===========================================================================
   Widget Interaktif Data Art 2026
   Semua widget berbasis vanilla JS dan Canvas murni tanpa dependensi luar.
   Gaya visual 100% mengikuti Desain PPT Original (Cambria serif, Calibri sans,
   palet #0C0B10 / #14141A / #F2F0EA / #E0A537 / #1A6B65).
   =========================================================================== */

(function () {
  'use strict';

  var W = (window.WIDGETS = window.WIDGETS || {});

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* =========================================================================
     W1 - collatz-explorer: Visualisasi Dinamis Pohon Collatz (Slide Matematika)
     ========================================================================= */

  W['collatz-explorer'] = function (host) {
    host.innerHTML = '';

    var container = el('div', 'art-layout');
    container.style.cssText = 'width:100%;height:100%;';

    var canvasWrap = el('div', 'art-figure');
    canvasWrap.style.cssText = 'background:#08070B;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;';

    var canvas = document.createElement('canvas');
    canvas.width = 580;
    canvas.height = 430;
    canvas.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;';
    canvasWrap.appendChild(canvas);

    var ctrlPanel = el('div', 'card');
    ctrlPanel.style.cssText = 'background:#14141A;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;';

    ctrlPanel.innerHTML =
      '<div>' +
      '<div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:6px;">Metode &middot; Lepas Kendali</div>' +
      '<h3 style="font-family:Cambria,serif;margin:0 0 10px;font-size:22px;color:var(--amber);">Pertumbuhan Pohon Collatz</h3>' +
      '<p style="font-size:14px;line-height:1.5;color:var(--text-bright);margin-bottom:14px;">' +
      'Aturan sederhana <i>3n+1</i>: jika bilangan genap belok kiri <b style="color:var(--amber);">9&deg;</b>, ' +
      'jika ganjil belok kanan <b style="color:var(--amber);">16&deg;</b>. Pola fraktal ini muncul tanpa menggambar tangan.' +
      '</p>' +
      '<div style="margin-bottom:12px;">' +
      '<label style="display:flex;justify-content:space-between;font-size:13.5px;color:var(--text-bright);margin-bottom:4px;">' +
      '<span>Jumlah Bilangan Awal</span><span id="collatzCountVal" style="color:var(--amber);font-weight:bold;">1.200</span>' +
      '</label>' +
      '<input type="range" id="collatzCount" min="300" max="3000" step="100" value="1200" style="width:100%;accent-color:var(--amber);cursor:pointer;">' +
      '</div>' +
      '<div style="margin-bottom:14px;">' +
      '<label style="display:flex;justify-content:space-between;font-size:13.5px;color:var(--text-bright);margin-bottom:4px;">' +
      '<span>Sudut Belok Genap / Ganjil</span><span id="collatzAngleVal" style="color:var(--amber);font-weight:bold;">9&deg; / 16&deg;</span>' +
      '</label>' +
      '<input type="range" id="collatzAngle" min="4" max="24" step="1" value="9" style="width:100%;accent-color:var(--amber);cursor:pointer;">' +
      '</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;">' +
      '<button id="btnRedrawCollatz" type="button" class="btn" style="flex:1;padding:10px;font-weight:bold;background:var(--amber);color:#0C0B10;border:none;border-radius:3px;cursor:pointer;">Gambar Ulang</button>' +
      '<button id="btnToggleAnim" type="button" class="btn" style="padding:10px 14px;font-weight:bold;background:#24232C;color:var(--amber);border:1px solid rgba(224,165,55,0.3);border-radius:3px;cursor:pointer;">Animasi Tumbuh</button>' +
      '</div>';

    container.appendChild(canvasWrap);
    container.appendChild(ctrlPanel);
    host.appendChild(container);

    var ctx = canvas.getContext('2d');
    var animFrame = null;

    function getCollatzSeq(n) {
      var seq = [n];
      while (n > 1) {
        if (n % 2 === 0) n = n / 2;
        else n = 3 * n + 1;
        seq.push(n);
        if (seq.length > 400) break;
      }
      return seq.reverse();
    }

    function renderCollatz(maxNumbers, leftAngleDeg, animate) {
      if (animFrame) cancelAnimationFrame(animFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#08070B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      var sequences = [];
      for (var i = 2; i <= maxNumbers; i += Math.max(1, Math.floor(maxNumbers / 250))) {
        sequences.push(getCollatzSeq(i));
      }

      var rightAngleRad = (leftAngleDeg * 1.77) * Math.PI / 180;
      var leftAngleRad = -leftAngleDeg * Math.PI / 180;
      var stepLen = 4.2;
      var startX = canvas.width * 0.52;
      var startY = canvas.height * 0.88;

      var currentSeqIdx = 0;
      var totalToDraw = sequences.length;

      function drawStep() {
        var limit = animate ? Math.min(currentSeqIdx + 6, totalToDraw) : totalToDraw;
        for (var s = currentSeqIdx; s < limit; s++) {
          var seq = sequences[s];
          var x = startX;
          var y = startY;
          var angle = -Math.PI / 2;

          ctx.beginPath();
          ctx.moveTo(x, y);

          for (var j = 1; j < seq.length; j++) {
            var val = seq[j];
            if (val % 2 === 0) angle += leftAngleRad;
            else angle += rightAngleRad;

            x += Math.cos(angle) * stepLen;
            y += Math.sin(angle) * stepLen;
            ctx.lineTo(x, y);
          }

          var alpha = 0.20 + 0.14 * (s / totalToDraw);
          ctx.strokeStyle = s % 3 === 0 ? 'rgba(224, 165, 55, ' + alpha + ')' : 'rgba(180, 121, 26, ' + (alpha * 0.85) + ')';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        currentSeqIdx = limit;
        if (currentSeqIdx < totalToDraw) {
          animFrame = requestAnimationFrame(drawStep);
        }
      }

      drawStep();
    }

    var sliderCount = ctrlPanel.querySelector('#collatzCount');
    var sliderAngle = ctrlPanel.querySelector('#collatzAngle');
    var countVal = ctrlPanel.querySelector('#collatzCountVal');
    var angleVal = ctrlPanel.querySelector('#collatzAngleVal');
    var btnRedraw = ctrlPanel.querySelector('#btnRedrawCollatz');
    var btnAnim = ctrlPanel.querySelector('#btnToggleAnim');

    sliderCount.addEventListener('input', function () {
      countVal.textContent = parseInt(sliderCount.value, 10).toLocaleString('id-ID');
      renderCollatz(parseInt(sliderCount.value, 10), parseFloat(sliderAngle.value), false);
    });

    sliderAngle.addEventListener('input', function () {
      var a = parseFloat(sliderAngle.value);
      angleVal.textContent = a + '° / ' + Math.round(a * 1.77) + '°';
      renderCollatz(parseInt(sliderCount.value, 10), a, false);
    });

    btnRedraw.addEventListener('click', function () {
      renderCollatz(parseInt(sliderCount.value, 10), parseFloat(sliderAngle.value), false);
    });

    btnAnim.addEventListener('click', function () {
      renderCollatz(parseInt(sliderCount.value, 10), parseFloat(sliderAngle.value), true);
    });

    renderCollatz(1200, 9, false);

    return function () {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  };

  /* =========================================================================
     W2 - lorenz-divergence: Atraktor Lorenz "Dua Hidup" (Slide Fisika)
     ========================================================================= */

  W['lorenz-divergence'] = function (host) {
    host.innerHTML = '';

    var container = el('div', 'art-layout');
    container.style.cssText = 'width:100%;height:100%;';

    var canvasWrap = el('div', 'art-figure');
    canvasWrap.style.cssText = 'background:#08070B;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;';

    var canvas = document.createElement('canvas');
    canvas.width = 580;
    canvas.height = 430;
    canvas.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;';
    canvasWrap.appendChild(canvas);

    var liveStats = el('div', null);
    liveStats.style.cssText = 'position:absolute;left:14px;top:14px;font-family:Consolas,monospace;font-size:12px;color:rgba(255,255,255,0.85);background:rgba(12,11,16,0.8);padding:6px 12px;border:1px solid rgba(255,255,255,0.1);border-radius:3px;';
    liveStats.innerHTML = '&Delta; Posisi: <span id="lorenzDelta" style="color:var(--amber);font-weight:bold;">1.00e-9</span>';
    canvasWrap.appendChild(liveStats);

    var ctrlPanel = el('div', 'card');
    ctrlPanel.style.cssText = 'background:#14141A;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;';

    ctrlPanel.innerHTML =
      '<div>' +
      '<div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:6px;">Metode &middot; Lepas Kendali</div>' +
      '<h3 style="font-family:Cambria,serif;margin:0 0 10px;font-size:22px;color:var(--amber);">Sensitivitas Kondisi Awal Lorenz</h3>' +
      '<p style="font-size:14px;line-height:1.5;color:var(--text-bright);margin-bottom:14px;">' +
      'Dua sistem Lorenz berjalan bersamaan. Selisih koordinat awal hanya <b style="color:var(--amber);">0,000000001</b>. ' +
      'Jalur emas (<span style="color:#E0A537;font-weight:bold;">● Sistem A</span>) dan jalur toska (<span style="color:#45AEA4;font-weight:bold;">● Sistem B</span>) ' +
      'awalnya menyatu sempurna, lalu berpisah tanpa pernah bertemu lagi.' +
      '</p>' +
      '<div style="margin-bottom:14px;">' +
      '<label style="display:flex;justify-content:space-between;font-size:13.5px;color:var(--text-bright);margin-bottom:6px;">' +
      '<span>Kecepatan Waktu (dt)</span><span id="lorenzSpeedVal" style="color:var(--amber);">Normal</span>' +
      '</label>' +
      '<div style="display:flex;gap:6px;">' +
      '<button id="btnSpeedSlow" type="button" class="btn" style="flex:1;padding:6px;font-size:12px;background:#24232C;color:#ddd;border:1px solid rgba(255,255,255,0.1);border-radius:3px;cursor:pointer;">Lambat</button>' +
      '<button id="btnSpeedNorm" type="button" class="btn" style="flex:1;padding:6px;font-size:12px;background:var(--amber);color:#0C0B10;font-weight:bold;border:none;border-radius:3px;cursor:pointer;">Normal</button>' +
      '<button id="btnSpeedFast" type="button" class="btn" style="flex:1;padding:6px;font-size:12px;background:#24232C;color:#ddd;border:1px solid rgba(255,255,255,0.1);border-radius:3px;cursor:pointer;">Cepat</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;">' +
      '<button id="btnPlayLorenz" type="button" class="btn" style="flex:1;padding:10px;font-weight:bold;background:var(--amber);color:#0C0B10;border:none;border-radius:3px;cursor:pointer;">Jeda / Lanjut</button>' +
      '<button id="btnResetLorenz" type="button" class="btn" style="padding:10px 14px;font-weight:bold;background:#24232C;border:1px solid rgba(255,255,255,0.1);color:#ddd;border-radius:3px;cursor:pointer;">Reset</button>' +
      '</div>';

    container.appendChild(canvasWrap);
    container.appendChild(ctrlPanel);
    host.appendChild(container);

    var ctx = canvas.getContext('2d');
    var animId = null;
    var isRunning = true;
    var dt = 0.008;

    var sigma = 10, rho = 28, beta = 8 / 3;

    var p1 = { x: 0.1, y: 0.0, z: 0.0 };
    var p2 = { x: 0.1 + 1e-9, y: 0.0, z: 0.0 };

    var trail1 = [];
    var trail2 = [];
    var maxTrail = 1800;

    function resetSimulation() {
      p1 = { x: 0.1, y: 0.0, z: 0.0 };
      p2 = { x: 0.1 + 1e-9, y: 0.0, z: 0.0 };
      trail1 = [];
      trail2 = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function project(p) {
      var scale = 8.4;
      var cx = canvas.width / 2;
      var cy = canvas.height * 0.94;
      return {
        x: cx + p.x * scale,
        y: cy - p.z * scale
      };
    }

    function step() {
      if (!isRunning) {
        animId = requestAnimationFrame(step);
        return;
      }

      for (var k = 0; k < 4; k++) {
        var dx1 = sigma * (p1.y - p1.x);
        var dy1 = p1.x * (rho - p1.z) - p1.y;
        var dz1 = p1.x * p1.y - beta * p1.z;
        p1.x += dx1 * dt;
        p1.y += dy1 * dt;
        p1.z += dz1 * dt;

        var dx2 = sigma * (p2.y - p2.x);
        var dy2 = p2.x * (rho - p2.z) - p2.y;
        var dz2 = p2.x * p2.y - beta * p2.z;
        p2.x += dx2 * dt;
        p2.y += dy2 * dt;
        p2.z += dz2 * dt;

        trail1.push({ x: p1.x, y: p1.y, z: p1.z });
        trail2.push({ x: p2.x, y: p2.y, z: p2.z });

        if (trail1.length > maxTrail) { trail1.shift(); trail2.shift(); }
      }

      ctx.fillStyle = 'rgba(8, 7, 11, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (trail1.length > 1) {
        ctx.beginPath();
        var pt0 = project(trail1[0]);
        ctx.moveTo(pt0.x, pt0.y);
        for (var i = 1; i < trail1.length; i++) {
          var pt = project(trail1[i]);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(224, 165, 55, 0.8)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        ctx.beginPath();
        var pt2_0 = project(trail2[0]);
        ctx.moveTo(pt2_0.x, pt2_0.y);
        for (var j = 1; j < trail2.length; j++) {
          var pt2 = project(trail2[j]);
          ctx.lineTo(pt2.x, pt2.y);
        }
        ctx.strokeStyle = 'rgba(69, 174, 164, 0.75)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        var head1 = project(p1);
        var head2 = project(p2);

        ctx.fillStyle = '#E0A537';
        ctx.beginPath();
        ctx.arc(head1.x, head1.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#45AEA4';
        ctx.beginPath();
        ctx.arc(head2.x, head2.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      var dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
      var deltaEl = canvasWrap.querySelector('#lorenzDelta');
      if (deltaEl) deltaEl.textContent = dist < 0.01 ? dist.toExponential(2) : dist.toFixed(3);

      animId = requestAnimationFrame(step);
    }

    step();

    var btnPlay = ctrlPanel.querySelector('#btnPlayLorenz');
    var btnReset = ctrlPanel.querySelector('#btnResetLorenz');

    btnPlay.addEventListener('click', function () {
      isRunning = !isRunning;
      btnPlay.textContent = isRunning ? 'Jeda' : 'Lanjut';
    });

    btnReset.addEventListener('click', function () {
      resetSimulation();
      isRunning = true;
      btnPlay.textContent = 'Jeda';
    });

    var spSlow = ctrlPanel.querySelector('#btnSpeedSlow');
    var spNorm = ctrlPanel.querySelector('#btnSpeedNorm');
    var spFast = ctrlPanel.querySelector('#btnSpeedFast');

    [spSlow, spNorm, spFast].forEach(function (btn) {
      btn.addEventListener('click', function () {
        [spSlow, spNorm, spFast].forEach(function (b) {
          b.style.background = '#24232C';
          b.style.color = '#ddd';
          b.style.fontWeight = 'normal';
        });
        btn.style.background = 'var(--amber)';
        btn.style.color = '#0C0B10';
        btn.style.fontWeight = 'bold';
      });
    });

    spSlow.addEventListener('click', function () { dt = 0.003; });
    spNorm.addEventListener('click', function () { dt = 0.008; });
    spFast.addEventListener('click', function () { dt = 0.016; });

    return function () {
      if (animId) cancelAnimationFrame(animId);
    };
  };

  /* =========================================================================
     W3 - tiga-uji-checker: Evaluator Mandiri 3 Uji Karya (Slide Evaluasi)
     ========================================================================= */

  W['tiga-uji-checker'] = function (host) {
    host.innerHTML = '';

    var container = el('div', 'widget-host');
    container.style.cssText = 'width:100%;height:100%;display:flex;gap:24px;';

    var testCol = el('div', null);
    testCol.style.cssText = 'flex:1.1;display:flex;flex-direction:column;gap:12px;';

    var tests = [
      {
        id: 'u1',
        num: '1',
        title: 'UJI SUMBER &mdash; Ada berkas datanya?',
        desc: 'Bisakah Anda menunjukkan berkas pengukuran, spreadsheet, log instrumen, atau output kalkulasi lab? Bukan sekadar prompt ilustrasi imajinatif.'
      },
      {
        id: 'u2',
        num: '2',
        title: 'UJI UBAH &mdash; Kalau data diganti, karya berubah?',
        desc: 'Jika data input diubah, apakah geometri karya ikut berubah? (Jika tidak, data hanya berfungsi sebagai tema dekoratif, seperti Batik Fibonacci).'
      },
      {
        id: 'u3',
        num: '3',
        title: 'UJI DIAM &mdash; Karya bisa berdiri tanpa Anda?',
        desc: 'Apakah orang awam di galeri bisa menangkap pesonanya tanpa Anda harus berdiri di sebelahnya dan berceramah lima menit?'
      }
    ];

    var checksHtml = tests.map(function (t) {
      return '<div class="card" style="background:#F2F0EA;border:1px solid #E4E0D6;padding:16px 20px;cursor:pointer;border-radius:4px;transition:all .2s;" data-check-box="' + t.id + '">' +
        '<label style="display:flex;align-items:flex-start;gap:14px;cursor:pointer;">' +
        '<input type="checkbox" id="' + t.id + '" style="margin-top:4px;width:18px;height:18px;accent-color:#1A6B65;cursor:pointer;">' +
        '<div>' +
        '<b style="font-family:Cambria,serif;font-size:17px;color:#1A1A1A;display:block;margin-bottom:4px;">' + t.title + '</b>' +
        '<span style="font-size:14px;line-height:1.45;color:#4A4A4A;display:block;">' + t.desc + '</span>' +
        '</div>' +
        '</label>' +
        '</div>';
    }).join('');

    testCol.innerHTML = checksHtml;

    var resultCol = el('div', 'card');
    resultCol.style.cssText = 'flex:0.9;background:#14141A;border:1px solid rgba(255,255,255,0.08);padding:24px;display:flex;flex-direction:column;justify-content:space-between;border-radius:4px;';

    resultCol.innerHTML =
      '<div>' +
      '<div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:8px;">SIMULASI KURASI MANDIRI</div>' +
      '<h3 id="verdictTitle" style="font-family:Cambria,serif;font-size:24px;margin:0 0 12px;color:#FFFFFF;">Centang Uji di Kiri</h3>' +
      '<div id="verdictBadge" style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:bold;letter-spacing:1px;background:rgba(255,255,255,0.1);color:#aaa;border-radius:2px;margin-bottom:14px;">BELUM DIUJI</div>' +
      '<p id="verdictDesc" style="font-size:15px;line-height:1.55;color:var(--text-bright);margin:0;">' +
      'Centang kondisi karya Anda di sebelah kiri untuk melihat simulasi evaluasi kuratorial awal.' +
      '</p>' +
      '</div>' +
      '<div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:14px;margin-top:14px;font-size:13.5px;color:var(--amber);">' +
      'Catatan Kurator: Tiga pertanyaan inilah yang diajukan oleh kurator sebelum karya dinyatakan lolos pameran.' +
      '</div>';

    container.appendChild(testCol);
    container.appendChild(resultCol);
    host.appendChild(container);

    function updateVerdict() {
      var c1 = host.querySelector('#u1').checked;
      var c2 = host.querySelector('#u2').checked;
      var c3 = host.querySelector('#u3').checked;

      var vTitle = host.querySelector('#verdictTitle');
      var vBadge = host.querySelector('#verdictBadge');
      var vDesc = host.querySelector('#verdictDesc');

      if (c1 && c2 && c3) {
        vTitle.textContent = 'Lolos Kurasi Sempurna';
        vBadge.textContent = 'KARYA DATA ART OTENTIK';
        vBadge.style.background = '#1A6B65';
        vBadge.style.color = '#FFFFFF';
        vDesc.innerHTML = 'Karya Anda memenuhi standar integritas tertinggi: berpijak pada data nyata laboratorium, bentuknya dihitung dari data, dan mampu berkomunikasi mandiri dengan pengunjung galeri.';
      } else if (!c1) {
        vTitle.textContent = 'Gugur di Uji Sumber';
        vBadge.textContent = 'ILUSTRASI TANPA DATA';
        vBadge.style.background = '#b71c1c';
        vBadge.style.color = '#fff';
        vDesc.innerHTML = 'Karya ini adalah ilustrasi bebas, bukan Data Art. Di baliknya belum ada berkas data terukur atau observasi nyata. Ambil berkas data dari riset lab Anda terlebih dahulu.';
      } else if (!c2) {
        vTitle.textContent = 'Gugur di Uji Ubah';
        vBadge.textContent = 'DATA SEBAGAI TEMA SAJA';
        vBadge.style.background = '#b4791a';
        vBadge.style.color = '#fff';
        vDesc.innerHTML = 'Ini jebakan yang dialami karya <i>Batik Fibonacci</i>: datanya ada, tetapi jika data diganti gambarnya tidak ikut berubah. Hubungkan parameter visual langsung dengan matriks angka datanya.';
      } else if (!c3) {
        vTitle.textContent = 'Perlu Selesai Satu Langkah';
        vBadge.textContent = 'BUTUH PENYEDERHANAAN BENTUK';
        vBadge.style.background = '#37474f';
        vBadge.style.color = '#fff';
        vDesc.innerHTML = 'Datanya jujur dan reaktif, tetapi orang awam masih membutuhkan penjelasan lisan panjang untuk memahaminya. Sederhanakan penandanya agar lebih intuitif bagi pengunjung galeri.';
      } else {
        vTitle.textContent = 'Belum Memenuhi Syarat';
        vBadge.textContent = 'PROSES EVALUASI';
        vBadge.style.background = 'rgba(255,255,255,0.1)';
        vBadge.style.color = '#aaa';
        vDesc.textContent = 'Centang minimal satu kriteria untuk melihat analisis kurasi.';
      }
    }

    tests.forEach(function (t) {
      var box = host.querySelector('[data-check-box="' + t.id + '"]');
      var input = host.querySelector('#' + t.id);
      input.addEventListener('change', updateVerdict);
      box.addEventListener('click', function (e) {
        if (e.target !== input) {
          input.checked = !input.checked;
          updateVerdict();
        }
      });
    });

    return null;
  };

  /* =========================================================================
     W4 - sponsor-tier-picker: Eksplorasi Paket Kemitraan (Slide Sponsor)
     ========================================================================= */

  W['sponsor-tier-picker'] = function (host) {
    host.innerHTML = '';

    var container = el('div', 'widget-host');
    container.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;gap:16px;';

    var btnRow = el('div', 'interactive-controls');
    btnRow.style.cssText = 'display:flex;gap:10px;justify-content:center;margin-bottom:4px;';

    var tiers = [
      {
        id: 'diamond',
        name: 'Diamond Partner',
        price: 'Rp 250.000.000',
        badge: 'Mitra Utama 3 Kota (Yogyakarta, Lampung, Bali)',
        summary: 'Kemitraan eksklusif terdepan dengan integrasi penuh pada seluruh ekosistem pameran, paviliun interaktif terdedikasi, dan sesi kehormatan.',
        perks: [
          'Branding eksklusif sebagai Mitra Utama pada seluruh materi publikasi 3 kota',
          'Zona Paviliun Interaktif Terdedikasi (Interactive Technology Space)',
          'Sesi Kehormatan Keynote / Sambutan pada Opening Ceremony GIK UGM',
          'Akses VIP Gala Dinner, Curated Artwork Tours & Media Conference',
          'Penempatan Logo Ukuran Terbesar pada Katalog Hardcover & Backdrop Utama',
          'Liputan khusus bersama tim kurator dan narasumber CERN art@CMS'
        ],
        cities: 'GIK UGM Yogyakarta &middot; Taman Budaya Lampung &middot; Taman Budaya Denpasar'
      },
      {
        id: 'gold',
        name: 'Gold Partner',
        price: 'Rp 150.000.000',
        badge: 'Mitra Kuratorial Tematik',
        summary: 'Dukungan strategis pada galeri tematik tertentu (misal: AI & Biomedis atau Lingkungan & Keberlanjutan) dengan eksposur luas.',
        perks: [
          'Hak penamaan (co-branding) satu Galeri Tematik Pameran',
          'Branding prominent pada materi publikasi dan 10+ media massa nasional',
          'Sesi Presentasi pada Talkshow Publik / Artist Talk',
          'Penempatan logo representatif di katalog pameran dan materi digital',
          '10 Undangan VIP Opening & Akses Eksklusif Sesi Kuratorial'
        ],
        cities: 'Pameran Utama GIK UGM & Tur Pameran Lampung / Bali'
      },
      {
        id: 'silver',
        name: 'Silver Partner',
        price: 'Rp 100.000.000',
        badge: 'Mitra Pendukung Kolaboratif',
        summary: 'Peluang partisipasi bagi institusi dan perusahaan yang ingin mendukung talenta data sains dan literasi visual generasi muda.',
        perks: [
          'Penempatan logo pada materi promosi bersama dan spanduk pameran',
          'Logo dan profil institusi pada halaman mitra dalam katalog resmi',
          'Apresiasi khusus pada penutupan acara dan laporan pameran',
          '5 Undangan VIP Opening Ceremony & Booklet Katalog Resmi'
        ],
        cities: 'Eksposur Pameran Yogyakarta, Lampung, & Denpasar'
      },
      {
        id: 'lab',
        name: 'Lab & Artwork Grant',
        price: 'Rp 25.000.000 – 50.000.000',
        badge: 'Skema Adopsi Karya Riset / In-Kind',
        summary: 'Dukungan langsung untuk membiayai produksi fisik, sensor, layar interaktif, atau cetak resolusi tinggi untuk 1 karya riset laboratorium.',
        perks: [
          'Pencantuman nama mitra / alumni sebagai "Sponsor Produksi" pada label dinding karya',
          'Karya hasil riset lab menjadi portofolio kolaborasi sains-industri yang dipublikasikan',
          'Peluang kolaborasi lanjutan antara lab peneliti UGM dengan unit riset industri mitra',
          'Sertifikat apresiasi resmi dari Dekanat FMIPA UGM'
        ],
        cities: 'Terpasang langsung di samping karya di ruang pameran galeri'
      }
    ];

    tiers.forEach(function (t, idx) {
      var b = el('button', 'btn', t.name);
      b.type = 'button';
      b.style.cssText = 'padding:8px 18px;font-size:13.5px;font-weight:bold;border-radius:20px;border:1px solid ' +
        (idx === 0 ? 'var(--amber)' : 'rgba(255,255,255,0.15)') + ';background:' +
        (idx === 0 ? 'var(--amber)' : '#181720') + ';color:' + (idx === 0 ? '#0C0B10' : 'var(--text-bright)') + ';cursor:pointer;transition:all .2s;';
      b.setAttribute('data-tier-id', t.id);
      btnRow.appendChild(b);
    });

    var displayCard = el('div', 'card');
    displayCard.style.cssText = 'flex:1;background:#14141A;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:26px 32px;display:flex;flex-direction:column;justify-content:space-between;transition:opacity 280ms cubic-bezier(0.16,1,0.3,1),transform 280ms cubic-bezier(0.16,1,0.3,1);';

    container.appendChild(btnRow);
    container.appendChild(displayCard);
    host.appendChild(container);

    function renderTier(t) {
      displayCard.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;">' +
        '<div>' +
        '<span style="display:inline-block;padding:3px 10px;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;background:#24232C;color:var(--amber);border:1px solid rgba(224,165,55,0.3);border-radius:2px;margin-bottom:8px;">' + t.badge + '</span>' +
        '<h3 style="margin:0;font-family:Cambria,serif;font-size:28px;color:#FFFFFF;font-weight:normal;">' + t.name + '</h3>' +
        '<p style="margin:6px 0 0;font-size:14.5px;color:var(--text-bright);">' + t.summary + '</p>' +
        '</div>' +
        '<div style="text-align:right;">' +
        '<div style="font-family:Cambria,serif;font-size:32px;font-weight:bold;color:var(--amber);line-height:1;">' + t.price + '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Komitmen Kolaborasi</div>' +
        '</div>' +
        '</div>' +
        '<div style="flex:1;margin:10px 0 16px;">' +
        '<div style="font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:var(--amber);margin:0 0 10px;">Fasilitas & Manfaat Kemitraan:</div>' +
        '<ul style="display:grid;grid-template-columns:1fr 1fr;gap:8px 28px;font-size:14px;color:var(--text-bright);padding-left:18px;margin:0;">' +
        t.perks.map(function (p) { return '<li style="line-height:1.45;">' + p + '</li>'; }).join('') +
        '</ul>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);font-size:13.5px;color:var(--text-muted);">' +
        '<span>Cakupan Wilayah: <b style="color:var(--text-bright);">' + t.cities + '</b></span>' +
        '<span>Narahubung: <b style="color:var(--amber);">Zuhri (+62 823-9207-4524)</b> &middot; mipa@ugm.ac.id</span>' +
        '</div>';
    }

    renderTier(tiers[0]);

    var allBtns = btnRow.querySelectorAll('button');
    allBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        allBtns.forEach(function (b) {
          b.style.background = '#181720';
          b.style.color = 'var(--text-bright)';
          b.style.borderColor = 'rgba(255,255,255,0.15)';
        });
        btn.style.background = 'var(--amber)';
        btn.style.color = '#0C0B10';
        btn.style.borderColor = 'var(--amber)';
        displayCard.style.opacity = '0';
        displayCard.style.transform = 'translateY(6px)';
        setTimeout(function () {
          renderTier(tiers[i]);
          displayCard.style.opacity = '1';
          displayCard.style.transform = 'none';
        }, 70);
      });
    });

    return null;
  };

  /* =========================================================================
     W5 - methods-matrix: Matriks 8 Bidang × 5 Metode (Slide Ringkasan Metode)
     ========================================================================= */

  W['methods-matrix'] = function (host) {
    host.innerHTML = '';

    var container = el('div', 'widget-host');
    container.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;gap:14px;';

    var prodiData = [
      { id: 'ilkom', name: 'Ilmu Komputer', karya: 'Peta Keraguan', metode: 'Ganti Pertanyaan', data: '750 titik latih SVM & entropi mesin', file: 'assets/figures/karya_ilkom_keraguan.jpg', desc: 'Akurasi adalah angka yang menenangkan; keraguan adalah gambar yang mengganggu dan lebih jujur.' },
      { id: 'elins', name: 'Elins', karya: 'Detak', metode: 'Ganti Penanda', data: '92 denyut sinyal EKG & variabilitas HRV', file: 'assets/figures/karya_elins_detak.jpg', desc: 'Garis EKG yang biasanya lewat dan hilang dilipat jadi spiral: ia berhenti jadi aliran dan menjadi benda.' },
      { id: 'mat', name: 'Matematika', karya: 'Akar Collatz', metode: 'Lepas Kendali', data: '20.000 bilangan bulat ditelusuri ke 1', file: 'assets/figures/karya_matematika_collatz.jpg', desc: 'Aturan 9° genap & 16° ganjil. Bentuk fraktal muncul dari dugaan Collatz yang belum terpecahkan sejak 1937.' },
      { id: 'fis', name: 'Fisika', karya: 'Dua Hidup', metode: 'Lepas Kendali', data: '2 sistem Lorenz beda delta 10⁻⁹', file: 'assets/figures/karya_fisika_lorenz.jpg', desc: 'Deterministik murni tanpa acak. Awalnya menyatu, lalu berpisah di garis batas dan tak pernah bertemu lagi.' },
      { id: 'kim', name: 'Kimia', karya: 'Menggambar Sendiri', metode: 'Ganti Materi', data: 'Sistem Gray-Scott 11.000 langkah', file: 'assets/figures/karya_kimia_grayscott.jpg', desc: 'Pola Turing reaksi-difusi yang sama dengan belang zebra. Ini kimia yang menggambar dirinya sendiri.' },
      { id: 'stat', name: 'Statistika', karya: 'Seribu Hidup', metode: 'Ganti Pertanyaan', data: '900 lintasan simulasi stokastik', file: 'assets/figures/karya_statistika_lintasan.jpg', desc: 'Rata-rata adalah satu-satunya lintasan yang tak pernah dialami siapa pun; ketidakpastian adalah bagian terjujur.' },
      { id: 'akt', name: 'Aktuaria', karya: '420 Hidup', metode: 'Ganti Skala', data: 'Tabel mortalitas Gompertz-Makeham', file: 'assets/figures/karya_aktuaria_usia.jpg', desc: 'Satu jari-jari satu orang. Takik di bawah adalah luka kematian usia muda yang tak bisa dilewati begitu saja.' },
      { id: 'geo', name: 'Geofisika', karya: 'Cincin Bumi', metode: 'Ganti Penanda', data: '365 hari rekaman gerak tanah seismik', file: 'assets/figures/karya_geofisika_cincin.jpg', desc: '22 cincin punya duri gempa, sisanya bumi yang tenang. Ketenangan bumi pun adalah data yang berharga.' }
    ];

    var btnRow = el('div', 'interactive-controls');
    btnRow.style.cssText = 'display:grid;grid-template-columns:repeat(8, 1fr);gap:6px;';

    prodiData.forEach(function (p, i) {
      var b = el('button', 'btn', p.name);
      b.type = 'button';
      b.style.cssText = 'padding:8px 4px;font-size:12px;font-weight:bold;border-radius:3px;border:1px solid ' +
        (i === 0 ? 'var(--amber)' : 'rgba(255,255,255,0.15)') + ';background:' +
        (i === 0 ? 'var(--amber)' : '#181720') + ';color:' + (i === 0 ? '#0C0B10' : 'var(--text-bright)') + ';cursor:pointer;text-align:center;line-height:1.2;';
      btnRow.appendChild(b);
    });

    var viewWrap = el('div', 'art-layout');
    viewWrap.style.cssText = 'flex:1;min-height:390px;transition:opacity 280ms cubic-bezier(0.16,1,0.3,1),transform 280ms cubic-bezier(0.16,1,0.3,1);';

    container.appendChild(btnRow);
    container.appendChild(viewWrap);
    host.appendChild(container);

    function showItem(p) {
      viewWrap.innerHTML =
        '<div class="art-figure" style="background:#08070B;border:1px solid rgba(255,255,255,0.08);border-radius:4px;">' +
        '<img src="' + p.file + '" alt="' + p.karya + '">' +
        '<div class="art-figure__caption">' +
        '<b>' + p.karya + '</b> &middot; ' + p.name +
        '</div>' +
        '</div>' +
        '<div class="card" style="background:#14141A;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">' +
        '<div>' +
        '<div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:6px;">' + p.metode + '</div>' +
        '<h3 style="font-family:Cambria,serif;margin:0 0 4px;font-size:26px;color:#FFFFFF;">' + p.karya + '</h3>' +
        '<p style="font-size:14px;color:var(--text-muted);margin:0 0 16px;">Bidang: <b>' + p.name + ' FMIPA UGM</b></p>' +
        '<div style="margin-bottom:12px;">' +
        '<div style="font-size:12px;font-weight:bold;color:var(--amber);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Bahan Datanya:</div>' +
        '<div style="font-size:14.5px;color:var(--text-bright);">' + p.data + '</div>' +
        '</div>' +
        '<div>' +
        '<div style="font-size:12px;font-weight:bold;color:var(--amber);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Makna yang Ditawarkan:</div>' +
        '<div style="font-size:14.5px;line-height:1.5;color:var(--text-bright);">' + p.desc + '</div>' +
        '</div>' +
        '</div>' +
        '<div style="font-size:13px;color:var(--text-muted);border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;margin-top:10px;">' +
        'Dihasilkan dari ~200 baris Python & matplotlib murni tanpa menggambar tangan.' +
        '</div>' +
        '</div>';
    }

    showItem(prodiData[0]);

    var buttons = btnRow.querySelectorAll('button');
    buttons.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.style.background = '#181720';
          b.style.color = 'var(--text-bright)';
          b.style.borderColor = 'rgba(255,255,255,0.15)';
        });
        btn.style.background = 'var(--amber)';
        btn.style.color = '#0C0B10';
        btn.style.borderColor = 'var(--amber)';
        viewWrap.style.opacity = '0';
        viewWrap.style.transform = 'translateY(6px)';
        setTimeout(function () {
          showItem(prodiData[idx]);
          viewWrap.style.opacity = '1';
          viewWrap.style.transform = 'none';
        }, 70);
      });
    });

    return null;
  };

})();
