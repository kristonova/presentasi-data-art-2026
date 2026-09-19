/* ===========================================================================
   Bab 4: Tema 2026 & Tur Pameran 3 Kota (Slide 10 – 11)
   Tema "Extending Life", relevansi dengan Sustainable Life, dan tur 3 kota
   =========================================================================== */

(function () {
  'use strict';
  var D = (window.DECK = window.DECK || []);
  var V = window.VIZ;

  /* ---------------------------------------------------------------- Slide 10 */
  D.push({
    id: 's-10',
    cls: 'ed-split',
    chapter: 4,
    dark: true,
    num: 10,
    kicker: 'TEMA DATA ART 2026',
    title: '"Extending Life" &mdash; Menjaga dan Memperpanjang Hidup',
    footnote: 'Menjawab tema sesi Insight Session: Sustainable Life &bull; Memaknai data sains secara harfiah dan simbolis',
    notes: 'Tahun 2026 ini, tema besar kuratorial yang kita usung adalah "Extending Life" &mdash; memperpanjang dan merawat keberlanjutan hidup. ' +
      'Tema ini menyatu utuh dengan tema sesi kita malam ini: Sustainable Life. ' +
      'Secara harfiah, sains kita memperpanjang umur fisik manusia: riset biomedis kanker, monitoring kualitas udara, deteksi dini gempa bumi, hingga transisi energi hijau. ' +
      'Secara simbolis, data merekam memori peradaban, nilai-nilai luhur bangsa, dan rekam jejak kita agar terus hidup melintasi generasi dan waktu. ' +
      'Ini adalah tema yang sangat bertenaga dan menyentuh sisi terdalam kemanusiaan kita.',
    html:
      '<figure class="ed-bleed ed-bleed--art" data-anim="pudar">' +
      '<img src="assets/figures/extending_life_spiral.jpg" alt="Visual Tema Extending Life">' +
      '<figcaption class="ed-bleed__cap ed-bleed__cap--center">Spiral Waktu & Kehidupan &mdash; simbolisasi data sains yang merawat keberlanjutan hidup.</figcaption>' +
      '</figure>' +
      '<div class="s-body ed-center">' +
      '<div class="ed-dims ed-group">' +
      '<div class="ed-dim">' +
      '<div class="ed-dim__n">I</div>' +
      '<div>' +
      '<div class="ed-label">Dimensi Harfiah &middot; Sains Menjaga Kehidupan</div>' +
      '<h4 class="ed-h4">Ketahanan Fisik & Ekosistem Bumi</h4>' +
      '<p class="ed-p ed-p--sm">Capaian nyata sains yang memperpanjang usia dan kualitas hidup: riset biomedis dan genomik, teknologi konservasi lingkungan, mitigasi kebencanaan geofisika, dan ketahanan pangan.</p>' +
      '</div>' +
      '</div>' +
      '<div class="ed-dim ed-dim--alt">' +
      '<div class="ed-dim__n">II</div>' +
      '<div>' +
      '<div class="ed-label ed-label--alt">Dimensi Simbolis &middot; Data Merawat Peradaban</div>' +
      '<h4 class="ed-h4">Keabadian Memori & Nilai Luhur</h4>' +
      '<p class="ed-p ed-p--sm">Data sebagai medium yang mengabadikan ingatan kolektif, kearifan budaya, dan legasi pemikiran manusia agar tetap relevan, bermakna, dan hidup melampaui batas raga dan zaman.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
  });

  /* ---------------------------------------------------------------- Slide 11 */
  D.push({
    id: 's-11',
    chapter: 4,
    dark: false,
    num: 11,
    kicker: 'SKALA & JANGKAUAN 2026',
    title: 'Melangkah Lebih Jauh: Rangkaian Tur Pameran di Tiga Kota',
    footnote: 'Jadwal pelaksanaan resmi rangkaian pameran Data Art 2026 di Yogyakarta, Bandar Lampung, dan Denpasar Bali',
    notes: 'Jika di 2025 kita baru menggelar pameran di satu titik di Jogja Gallery, maka di 2026 ini kita melompat ke panggung nasional: tur 3 kota besar Indonesia! ' +
      'Pertama, di rumah kita sendiri: Gelanggang Inovasi dan Kreativitas (GIK) UGM, fasilitas megah kebanggaan kampus kita. ' +
      'Kedua, di Taman Budaya Lampung, berkolaborasi dengan Fakultas Sains Institut Teknologi Sumatera (ITERA). ' +
      'Ketiga, di Taman Budaya Denpasar, berkolaborasi dengan Fakultas Seni Rupa ISI Denpasar. ' +
      'Target kita adalah menampilkan 150 sampai 200 karya terkurasi dan menjangkau lebih dari 30 ribu pengunjung langsung.',
    html:
      '<div class="s-body ed-stack ed-stack--tight">' +
      '<div class="ed-tour">' +
      '<div class="ed-tour__map" data-anim="pudar">' +
      '<img src="assets/figures/peta_nusantara_titik.svg" alt="">' +
      '<svg viewBox="0 0 860 250" aria-hidden="true">' +
      '<g fill="none" stroke="#B4791A" stroke-width="1.6" stroke-dasharray="5 6" stroke-linecap="round">' +
      '<path d="' + V.arc(500.3, 184.8, 275.4, 80.5) + '"/>' +
      '<path d="' + V.arc(275.4, 80.5, 713.7, 222.2) + '"/>' +
      '</g>' +
      '<g class="ed-tour__pin"><circle cx="500.3" cy="184.8" r="12" fill="#B4791A"/><text x="500.3" y="189">1</text></g>' +
      '<g class="ed-tour__pin"><circle cx="275.4" cy="80.5" r="12" fill="#1A6B65"/><text x="275.4" y="84.7">2</text></g>' +
      '<g class="ed-tour__pin"><circle cx="713.7" cy="222.2" r="12" fill="#B4791A"/><text x="713.7" y="226.4">3</text></g>' +
      '<g class="ed-tour__city">' +
      '<text x="520" y="218">Yogyakarta</text>' +
      '<text x="258" y="112" text-anchor="end">Bandar Lampung</text>' +
      '<text x="696" y="247" text-anchor="end">Denpasar</text>' +
      '</g>' +
      '</svg>' +
      '</div>' +
      '<div class="ed-kpis ed-group">' +
      '<div class="ed-kpi"><b>150 &ndash; 200</b><span>Karya Data Art Terkurasi</span></div>' +
      '<div class="ed-kpi"><b>&gt; 30.000</b><span>Target Pengunjung Fisik</span></div>' +
      '<div class="ed-kpi"><b>3 Kampus Unggulan</b><span>Sinergi UGM, ITERA, dan ISI Denpasar</span></div>' +
      '<div class="ed-kpi"><b>Jutaan Impresi</b><span>Jangkauan Media Nasional & Digital</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="ed-cities ed-group">' +
      '<div class="ed-city">' +
      '<div class="ed-city__img"><img src="assets/figures/city_jogja.jpg" alt="GIK UGM Yogyakarta"><span>1</span></div>' +
      '<div>' +
      '<div class="ed-label">Kota 1 &middot; Oktober 2026</div>' +
      '<h3 class="ed-h3 ed-h3--sm">Yogyakarta</h3>' +
      '<p class="ed-venue">GIK Universitas Gadjah Mada</p>' +
      '<p class="ed-p ed-p--xs">Episentrum inovasi dan kreativitas kampus terbesar di Asia Tenggara. Menjadi pembuka pameran akbar 150&ndash;200 karya.</p>' +
      '</div>' +
      '</div>' +
      '<div class="ed-city ed-city--alt">' +
      '<div class="ed-city__img"><img src="assets/figures/city_lampung.jpg" alt="Taman Budaya Lampung"><span>2</span></div>' +
      '<div>' +
      '<div class="ed-label ed-label--alt">Kota 2 &middot; Oktober 2026</div>' +
      '<h3 class="ed-h3 ed-h3--sm">Bandar Lampung</h3>' +
      '<p class="ed-venue">Taman Budaya Lampung</p>' +
      '<p class="ed-p ed-p--xs">Pintu gerbang pulau Sumatera, berkolaborasi dengan Fakultas Sains Institut Teknologi Sumatera (ITERA).</p>' +
      '</div>' +
      '</div>' +
      '<div class="ed-city">' +
      '<div class="ed-city__img"><img src="assets/figures/city_bali.jpg" alt="Taman Budaya Denpasar"><span>3</span></div>' +
      '<div>' +
      '<div class="ed-label">Kota 3 &middot; November 2026</div>' +
      '<h3 class="ed-h3 ed-h3--sm">Denpasar, Bali</h3>' +
      '<p class="ed-venue">Taman Budaya Denpasar</p>' +
      '<p class="ed-p ed-p--xs">Panggung seni dan kebudayaan internasional, berkolaborasi dengan Fakultas Seni Rupa ISI Denpasar.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
  });

})();
