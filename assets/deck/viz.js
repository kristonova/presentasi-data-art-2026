/* ===========================================================================
   Pustaka Visual Editorial Data Art 2026
   Pembangkit SVG inline tanpa dependensi: unit chart, donut anggaran,
   ikon garis, ilustrasi paradigma, dan konstelasi jejaring.
   Palet mengikuti deck workshop: amber #E0A537, ochre #B4791A,
   teal #1A6B65 / #45AEA4, tinta #0C0B10, kertas #F2F0EA.
   =========================================================================== */

(function () {
  'use strict';

  var V = (window.VIZ = window.VIZ || {});

  function f(n) { return Math.round(n * 100) / 100; }

  /* Pembangkit acak deterministik agar setiap render identik */
  function acak(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* --- Butir poin editorial bernomor (pengganti kartu) ------------------- */

  V.point = function (n, title, desc) {
    return '<div class="ed-point">' +
      '<div class="ed-point__n">' + n + '</div>' +
      '<div><div class="ed-point__t">' + title + '</div>' +
      '<p class="ed-point__d">' + desc + '</p></div>' +
      '</div>';
  };

  /* --- Unit chart: satu titik = satu unit data --------------------------- */

  V.units = function (groups, o) {
    o = o || {};
    var per = o.perRow || 21, r = o.r || 3.6, gap = o.gap || 11;
    var total = 0;
    groups.forEach(function (g) { total += g.n; });
    var rows = Math.ceil(total / per);
    var w = (Math.min(per, total) - 1) * gap + r * 2 + 2;
    var h = (rows - 1) * gap + r * 2 + 2;
    var out = '', k = 0;
    groups.forEach(function (g) {
      for (var i = 0; i < g.n; i++, k++) {
        out += '<circle class="ed-seq" style="--i:' + k + '" cx="' + f(1 + r + (k % per) * gap) +
          '" cy="' + f(1 + r + Math.floor(k / per) * gap) + '" r="' + r + '" fill="' + g.color + '"/>';
      }
    });
    return '<svg class="ed-units" viewBox="0 0 ' + f(w) + ' ' + f(h) + '" width="' + f(w) +
      '" height="' + f(h) + '" aria-hidden="true">' + out + '</svg>';
  };

  /* --- Donut anggaran: segmen proporsional mulai jam 12 ------------------ */

  V.donut = function (segs, o) {
    o = o || {};
    var size = o.size || 300, sw = o.stroke || 24, gap = o.gap || 2.5;
    var cx = size / 2, r = (size - sw) / 2, c = 2 * Math.PI * r;
    var out = '<circle cx="' + cx + '" cy="' + cx + '" r="' + f(r) + '" fill="none" stroke="' +
      (o.track || 'rgba(255,255,255,0.06)') + '" stroke-width="' + sw + '"/>';
    var acc = 0;
    segs.forEach(function (s, i) {
      var len = c * s.pct / 100 - gap;
      out += '<circle class="ed-donut__seg" cx="' + cx + '" cy="' + cx + '" r="' + f(r) +
        '" fill="none" stroke="' + s.color + '" stroke-width="' + sw +
        '" stroke-dashoffset="' + f(-c * acc / 100) + '" style="--len:' + f(len) + 'px;--c:' + f(c) +
        'px;--i:' + i + '"/>';
      acc += s.pct;
    });
    return '<svg class="ed-donut" viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size +
      '" aria-hidden="true"><g transform="rotate(-90 ' + cx + ' ' + cx + ')">' + out + '</g></svg>';
  };

  /* --- Ikon garis 64x64 untuk empat nilai kemitraan ---------------------- */

  var IKON = {
    exposure:
      '<circle cx="32" cy="32" r="4" fill="currentColor" stroke="none"/>' +
      '<circle cx="32" cy="32" r="12"/>' +
      '<circle cx="32" cy="32" r="20" opacity=".6"/>' +
      '<circle cx="32" cy="32" r="28" opacity=".3"/>',
    equity:
      '<path d="M12 24 L21 11 H43 L52 24 L32 54 Z"/>' +
      '<path d="M12 24 H52 M21 11 L27 24 L32 54 M43 11 L37 24 L32 54 M27 24 L32 11 L37 24"/>',
    impact:
      '<path d="M8 54 H56" opacity=".45"/>' +
      '<path d="M10 47 L22 39 L32 42 L44 25 L54 13"/>' +
      '<circle cx="22" cy="39" r="2.6" fill="currentColor"/>' +
      '<circle cx="32" cy="42" r="2.6" fill="currentColor"/>' +
      '<circle cx="44" cy="25" r="2.6" fill="currentColor"/>' +
      '<path d="M46 13 H54 V21"/>',
    education:
      '<path d="M32 19 C25 13 15 13 8 15 V49 C15 47 25 47 32 53 C39 47 49 47 56 49 V15 C49 13 39 13 32 19 Z"/>' +
      '<path d="M32 19 V53"/>' +
      '<path d="M14 24 C19 23 24 24 27 26 M14 32 C19 31 24 32 27 34 M37 26 C40 24 45 23 50 24 M37 34 C40 32 45 31 50 32" opacity=".55"/>'
  };

  V.icon = function (name, cls) {
    return '<svg class="ed-icon ' + (cls || '') + '" viewBox="0 0 64 64" width="56" height="56" fill="none" ' +
      'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      IKON[name] + '</svg>';
  };

  /* --- Ilustrasi paradigma (300x96): data, rasa, dialog ------------------ */

  V.illus = function (name) {
    var W = 300, H = 96, out = '';
    var ochre = '#B4791A', teal = '#1A6B65', ink = '#14141A';

    if (name === 'data') {
      for (var gx = 6; gx < W; gx += 14) {
        for (var gy = 6; gy < H; gy += 14) {
          out += '<circle cx="' + gx + '" cy="' + gy + '" r="0.9" fill="' + ink + '" opacity=".16"/>';
        }
      }
      var rnd = acak(7);
      for (var i = 0; i < 22; i++) {
        var x = 18 + i * 12.4;
        var base = 78 - 58 / (1 + Math.exp(-(x - 150) / 34));
        var y = base + (rnd() - 0.5) * 16;
        out += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="3" fill="' + ochre + '"/>';
      }
      var d = '';
      for (var px = 10; px <= 290; px += 5) {
        d += (px === 10 ? 'M' : 'L') + px + ' ' + f(78 - 58 / (1 + Math.exp(-(px - 150) / 34)));
      }
      out += '<path class="garis-gambar" d="' + d + '" fill="none" stroke="' + ink + '" stroke-width="1.4"/>';
    }

    if (name === 'rasa') {
      for (var k = 0; k < 7; k++) {
        var p = '';
        for (var xx = 0; xx <= W; xx += 4) {
          var amp = 12 + k * 3.2;
          var yy = 48 + amp * Math.sin(xx / (38 + k * 3) + k * 0.55) * Math.sin(xx / 120 + 0.4);
          p += (xx === 0 ? 'M' : 'L') + xx + ' ' + f(yy);
        }
        out += '<path class="garis-gambar" d="' + p + '" fill="none" stroke="' + teal + '" stroke-width="1.2" opacity="' +
          f(0.25 + k * 0.1) + '"/>';
      }
    }

    if (name === 'dialog') {
      var nodes = [[40, 30, ochre], [104, 68, teal], [150, 22, ink], [196, 70, ochre], [252, 34, teal], [150, 56, ochre], [22, 74, ink], [284, 76, ink]];
      var edges = [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 1], [1, 3], [2, 4], [3, 4], [0, 6], [4, 7], [0, 2], [6, 1], [3, 7]];
      edges.forEach(function (e) {
        var a = nodes[e[0]], b = nodes[e[1]];
        out += '<path class="garis-gambar" d="M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1] +
          '" stroke="' + ink + '" stroke-opacity=".28" stroke-width="1"/>';
      });
      nodes.forEach(function (n, i) {
        out += '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + (i === 5 ? 7 : 4.5) + '" fill="' + n[2] + '"/>';
        if (i === 5) out += '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="13" fill="none" stroke="' + ochre + '" stroke-opacity=".45"/>';
      });
    }

    return '<svg class="ed-illus" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + out + '</svg>';
  };

  /* --- Konstelasi jejaring alumni ---------------------------------------- */

  V.network = function (w, h, seed) {
    var rnd = acak(seed || 71);
    var pts = [], i, j;
    for (i = 0; i < 54; i++) pts.push([f(18 + rnd() * (w - 36)), f(18 + rnd() * (h - 36))]);
    var hub = [w * 0.58, h * 0.46];
    var out = '';

    function jarak(a, b) { var dx = a[0] - b[0], dy = a[1] - b[1]; return Math.sqrt(dx * dx + dy * dy); }

    for (i = 0; i < pts.length; i++) {
      var dekat = pts.map(function (p, k) { return [jarak(pts[i], p), k]; })
        .sort(function (a, b) { return a[0] - b[0]; }).slice(1, 3);
      for (j = 0; j < dekat.length; j++) {
        var q = pts[dekat[j][1]];
        out += '<path d="M' + pts[i][0] + ' ' + pts[i][1] + ' L' + q[0] + ' ' + q[1] +
          '" stroke="#FFFFFF" stroke-opacity=".13" stroke-width="0.8"/>';
      }
    }
    var keHub = pts.map(function (p, k) { return [jarak(hub, p), k]; })
      .sort(function (a, b) { return a[0] - b[0]; }).slice(0, 14);
    keHub.forEach(function (e) {
      var p = pts[e[1]];
      out += '<path class="garis-gambar" d="M' + f(hub[0]) + ' ' + f(hub[1]) + ' L' + p[0] + ' ' + p[1] +
        '" stroke="#E0A537" stroke-opacity=".55" stroke-width="0.9"/>';
    });
    pts.forEach(function (p, k) {
      out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (1.6 + rnd() * 2.2).toFixed(2) +
        '" fill="' + (k % 5 === 0 ? '#45AEA4' : '#FFFFFF') + '" fill-opacity="' + (0.35 + rnd() * 0.45).toFixed(2) + '"/>';
    });
    out += '<circle cx="' + f(hub[0]) + '" cy="' + f(hub[1]) + '" r="7" fill="#E0A537"/>' +
      '<circle class="ed-pulse" cx="' + f(hub[0]) + '" cy="' + f(hub[1]) + '" r="18" fill="none" stroke="#E0A537" stroke-opacity=".5"/>';

    return '<svg class="ed-network" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + out + '</svg>';
  };

  /* --- Busur lengkung antar titik (peta) --------------------------------- */

  V.arc = function (x1, y1, x2, y2, lift) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = dy / len, ny = -dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    var k = lift == null ? len * 0.28 : lift;
    return 'M' + f(x1) + ' ' + f(y1) + ' Q' + f(mx + nx * k) + ' ' + f(my + ny * k) + ' ' + f(x2) + ' ' + f(y2);
  };

})();
