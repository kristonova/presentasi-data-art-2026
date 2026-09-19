/* ===========================================================================
   Bab 3: Gaung Publik & Panggung Global (Slide 8 – 9)
   Liputan media nasional dan perbandingan ekosistem data art dunia
   =========================================================================== */

(function () {
  'use strict';
  var D = (window.DECK = window.DECK || []);
  var V = window.VIZ;

  /* ---------------------------------------------------------------- Slide 8 */
  D.push({
    id: 's-08',
    cls: 'ed-split',
    chapter: 3,
    dark: false,
    num: 8,
    kicker: 'DAYA JANGKAU PUBLIK',
    title: 'Disambut Antusias Ribuan Penikmat dan Media Nasional',
    footnote: 'Liputan lebih dari 10 media nasional dan lokal terkemuka pada penyelenggaraan Data Art 2025',
    notes: 'Gaung dari penyelenggaraan perdana kemarin sangat luar biasa. ' +
      'Lebih dari 10 media arus utama nasional dan lokal meliput secara masif: Kompas, Kumparan, IDN Times, Republika, Suara.com, Kedaulatan Rakyat, Koran Jakarta, dan banyak lagi. ' +
      'Masyarakat awam, keluarga, hingga anak-anak muda berkunjung dan terkesima. ' +
      'Banyak pelajar SMA yang hadir mengaku bahwa pameran ini membuka mata mereka bahwa sains MIPA itu hidup, indah, dan keren &mdash; sebuah sarana promosi paling elegan bagi almamater kita.',
    html:
      '<figure class="ed-bleed ed-bleed--quote" data-anim="pudar">' +
      '<img src="assets/figures/evaluasi_2025_1.jpg" alt="Pengunjung pameran Data Art 2025">' +
      '<figcaption class="ed-bleed__quote">' +
      '<div class="ed-label">Catatan Liputan Pers</div>' +
      '<blockquote class="ed-quote ed-quote--light">&ldquo;Data Art membuktikan bahwa sains tidak lagi hanya milik laboratorium tertutup. Angka-angka riset kampus bermutasi menjadi narasi visual yang menghanyutkan dan bermakna bagi publik.&rdquo;</blockquote>' +
      '<div class="ed-bleed__src"><b>Rangkuman Liputan Media Nasional &middot; Data Art 2025</b></div>' +
      '</figcaption>' +
      '</figure>' +
      '<div class="s-body ed-stack">' +
      '<div class="ed-points ed-group">' +
      V.point('01', 'Liputan Lebih dari 10 Media Nasional', 'Diwartakan secara mendalam oleh <b>Kompas, Kumparan, IDN Times, Republika, Suara.com, Kedaulatan Rakyat, Koran Jakarta</b>, menempatkan UGM di episentrum diskursus inovasi nasional.') +
      V.point('02', 'Mendekatkan Generasi Muda pada Sains', 'Menjadi daya tarik luar biasa bagi ratusan pelajar dan mahasiswa yang selama ini memandang sains sebagai bidang yang kaku dan menakutkan.') +
      V.point('03', 'Apresiasi Komunitas Kreatif & Budaya', 'Mendapat pengakuan hangat dari para kurator, seniman rupa, dan komunitas teknologi sebagai terobosan kultural yang segar di Indonesia.') +
      '</div>' +
      '<div class="ed-press" aria-hidden="true">' +
      '<span>Kompas</span><span>Kumparan</span><span>IDN Times</span><span>Republika</span><span>Suara.com</span><span>Kedaulatan Rakyat</span><span>Koran Jakarta</span>' +
      '</div>' +
      '</div>'
  });

  /* ---------------------------------------------------------------- Slide 9 */
  D.push({
    id: 's-09',
    chapter: 3,
    dark: true,
    num: 9,
    kicker: 'TREN GLOBAL DUNIA',
    title: 'Memposisikan UGM Sejajar dengan Gerakan Dunia',
    footnote: 'Inisiatif Data Art di berbagai episentrum inovasi dunia & peran kepeloporan UGM di Indonesia',
    notes: 'Di kancah internasional, persilangan sains dan seni ini sedang menjadi gelombang baru yang sangat bergengsi. ' +
      'New York memiliki Data Through Design yang mengolah data keterbukaan kota. ' +
      'London memiliki Data as Culture yang dipelopori Open Data Institute. ' +
      'Boston memiliki Data Flow yang memadukan kode algoritmik dengan instalasi interaktif. ' +
      'Dan CERN di Jenewa menjalankan program art@CMS bersama Dr. Michael Hoch. ' +
      'Dengan menggelar Data Art 2026, UGM menempatkan diri bukan sebagai pengikut, melainkan sebagai pelopor gerakan seni-sains nomor satu di Asia Tenggara.',
    html:
      '<div class="s-body ed-duo ed-duo--map">' +
      '<div class="ed-list ed-group">' +
      '<div class="ed-li"><span class="ed-li__n">1</span><div>' +
      '<div class="ed-label">New York</div>' +
      '<h4 class="ed-h4">Data Through Design</h4>' +
      '<p class="ed-p ed-p--xs">Pameran tahunan berbasis data terbuka kota New York untuk meningkatkan literasi dan transparansi kebijakan publik.</p>' +
      '</div></div>' +
      '<div class="ed-li"><span class="ed-li__n">2</span><div>' +
      '<div class="ed-label">London</div>' +
      '<h4 class="ed-h4">Data as Culture</h4>' +
      '<p class="ed-p ed-p--xs">Inisiatif The Open Data Institute (ODI) yang memakai data riil sebagai materi estetik dan eksperimen kuratorial.</p>' +
      '</div></div>' +
      '<div class="ed-li"><span class="ed-li__n">3</span><div>' +
      '<div class="ed-label">Boston</div>' +
      '<h4 class="ed-h4">Data Flow</h4>' +
      '<p class="ed-p ed-p--xs">Eksplorasi kode komputasi, visualisasi algoritmik, dan instalasi interaktif untuk memicu inovasi penelitian.</p>' +
      '</div></div>' +
      '<div class="ed-li"><span class="ed-li__n">4</span><div>' +
      '<div class="ed-label">Jenewa (CERN)</div>' +
      '<h4 class="ed-h4">art@CMS</h4>' +
      '<p class="ed-p ed-p--xs">Proyek dialog sains-seni fisika partikel oleh Dr. Michael Hoch yang telah berpameran di puluhan museum dunia.</p>' +
      '</div></div>' +
      '</div>' +
      '<div class="ed-mapwrap">' +
      '<div class="ed-map">' +
      '<img src="assets/figures/peta_dunia_titik.svg" alt="">' +
      '<svg viewBox="0 0 760 310" aria-hidden="true">' +
      '<g fill="none" stroke="#E0A537" stroke-width="1.2" stroke-opacity=".75">' +
      '<path class="garis-gambar" d="' + V.arc(152.0, 74.1, 652.4, 205.7) + '"/>' +
      '<path class="garis-gambar" d="' + V.arc(352.5, 44.8, 652.4, 205.7) + '"/>' +
      '<path class="garis-gambar" d="' + V.arc(160.0, 69.6, 652.4, 205.7, 110) + '"/>' +
      '<path class="garis-gambar" d="' + V.arc(369.5, 59.2, 652.4, 205.7, 70) + '"/>' +
      '</g>' +
      '<g fill="#FFFFFF">' +
      '<circle cx="152.0" cy="74.1" r="3.4"/><circle cx="160.0" cy="69.6" r="3.4"/>' +
      '<circle cx="352.5" cy="44.8" r="3.4"/><circle cx="369.5" cy="59.2" r="3.4"/>' +
      '</g>' +
      '<g class="ed-map__num">' +
      '<text x="144" y="90" text-anchor="end">1</text>' +
      '<text x="344" y="40" text-anchor="end">2</text>' +
      '<text x="168" y="62">3</text>' +
      '<text x="378" y="72">4</text>' +
      '</g>' +
      '<circle class="ed-pulse" cx="652.4" cy="205.7" r="13" fill="none" stroke="#E0A537"/>' +
      '<circle cx="652.4" cy="205.7" r="5.5" fill="#E0A537"/>' +
      '<text class="ed-map__tag" x="638" y="232" text-anchor="end">FMIPA UGM</text>' +
      '</svg>' +
      '</div>' +
      '<p class="ed-statement"><b>Posisi Strategis Indonesia:</b> Melalui inisiatif ini, FMIPA UGM memimpin lahirnya episentrum seni-sains pertama dan terbesar di Indonesia dan Asia Tenggara.</p>' +
      '</div>' +
      '</div>'
  });

})();
