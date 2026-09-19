/* ===========================================================================
   Bab 5: Program, Anggaran & Paket Sponsorship (Slide 12 – 14)
   Rangkaian program, transparansi RAB Rp 1,97 Miliar & paket kemitraan
   =========================================================================== */

(function () {
  'use strict';
  var D = (window.DECK = window.DECK || []);
  var V = window.VIZ;

  /* ---------------------------------------------------------------- Slide 12 */
  D.push({
    id: 's-12',
    chapter: 5,
    dark: false,
    num: 12,
    kicker: 'RANGKAIAN PROGRAM 2026',
    title: 'Bukan Sekadar Pameran, Melainkan Ekosistem Berkelanjutan',
    footnote: 'Format komprehensif Data Art 2026 memadukan pameran karya, edukasi generasi muda, dan dialog strategis',
    notes: 'Bapak dan Ibu, perhelatan 2026 ini bukan sekadar memasang gambar di dinding galeri. ' +
      'Kami merancangnya sebagai ekosistem dampak yang utuh melalui 3 pilar: ' +
      'Pertama, Pameran Utama dengan 150 sampai 200 karya imersif, video interaktif, dan instalasi sensorik. ' +
      'Kedua, Program Publik dan Workshop Gratis untuk pelajar SMA dan mahasiswa di setiap kota guna menumbuhkan kecintaan pada sains sejak dini. ' +
      'Ketiga, Artist & Scientist Talk yang mempertemukan para peneliti kita dengan para pelaku industri dan pengambil kebijakan publik.',
    html:
      '<div class="s-body ed-stack">' +
      '<div class="ed-duo ed-duo--venn">' +
      '<div class="ed-venn" data-anim="tumbuh">' +
      '<svg viewBox="0 0 420 372" aria-hidden="true">' +
      '<g style="mix-blend-mode:multiply">' +
      '<circle cx="150" cy="134" r="116" fill="#B4791A" fill-opacity=".13" stroke="#B4791A" stroke-width="1.3"/>' +
      '<circle cx="270" cy="134" r="116" fill="#1A6B65" fill-opacity=".12" stroke="#1A6B65" stroke-width="1.3"/>' +
      '<circle cx="210" cy="238" r="116" fill="#14141A" fill-opacity=".06" stroke="#14141A" stroke-opacity=".55" stroke-width="1.3"/>' +
      '</g>' +
      '<g class="ed-venn__t">' +
      '<text x="94" y="96" class="k" fill="#B4791A">Pilar 1</text><text x="94" y="118">Kurasi Utama</text>' +
      '<text x="322" y="96" class="k" fill="#1A6B65">Pilar 2</text><text x="322" y="118">Edukasi Pelajar</text>' +
      '<text x="210" y="300" class="k" fill="#5A5760">Pilar 3</text><text x="210" y="322">Dialog Kebijakan</text>' +
      '</g>' +
      '<circle cx="210" cy="170" r="4" fill="#B4791A"/>' +
      '<circle class="ed-pulse" cx="210" cy="170" r="11" fill="none" stroke="#B4791A"/>' +
      '<text x="210" y="198" class="ed-venn__c">Dampak</text>' +
      '</svg>' +
      '</div>' +
      '<div class="ed-points ed-group">' +
      '<div class="ed-point"><div class="ed-point__n">01</div><div>' +
      '<div class="ed-label">Pilar 1 &middot; Kurasi Utama</div>' +
      '<div class="ed-point__t ed-point__t--serif">Pameran Utama 150&ndash;200 Karya</div>' +
      '<p class="ed-point__d">Instalasi imersif, karya audiovisual, seni generatif AI, sensor kinetik, dan karya cetak beresolusi tinggi yang menghubungkan publik langsung dengan sains.</p>' +
      '</div></div>' +
      '<div class="ed-point ed-point--alt"><div class="ed-point__n">02</div><div>' +
      '<div class="ed-label ed-label--alt">Pilar 2 &middot; Edukasi Pelajar</div>' +
      '<div class="ed-point__t ed-point__t--serif">Program Publik & Workshop</div>' +
      '<p class="ed-point__d">Pelatihan literasi data dan visualisasi kreatif gratis bagi ribuan pelajar SMA, guru, dan mahasiswa lintas kampus untuk menyemai bibit saintis masa depan.</p>' +
      '</div></div>' +
      '<div class="ed-point"><div class="ed-point__n">03</div><div>' +
      '<div class="ed-label">Pilar 3 &middot; Dialog Kebijakan</div>' +
      '<div class="ed-point__t ed-point__t--serif">Artist & Scientist Talk</div>' +
      '<p class="ed-point__d">Forum temu wicara yang mempertemukan saintis MIPA, kurator, pemimpin industri teknologi, dan regulator guna membahas arah riset serta inovasi nasional.</p>' +
      '</div></div>' +
      '</div>' +
      '</div>' +
      '<p class="ed-statement"><b>Dampak Komprehensif:</b> Mengangkat reputasi riset universitas sekaligus memberi sumbangsih nyata bagi literasi sains masyarakat Indonesia.</p>' +
      '</div>'
  });

  /* ---------------------------------------------------------------- Slide 13 */
  D.push({
    id: 's-13',
    chapter: 5,
    dark: true,
    num: 13,
    kicker: 'TRANSPARANSI ANGGARAN',
    title: 'Rancangan Anggaran Biaya: Kebutuhan Rp 1,97 Miliar',
    footnote: 'Rincian resmi dokumen Rancangan Anggaran Biaya (RAB) Penyelenggaraan Tur Data Art 2026 di 3 Kota',
    notes: 'Untuk menyelenggarakan perhelatan akbar di 3 kota besar lintas pulau ini, panitia telah menyusun Rancangan Anggaran Biaya yang sangat akuntabel dan transparan sebesar 1,97 miliar rupiah. ' +
      'Porsi terbesar, hampir 50%, adalah untuk produksi karya fisik, display, instalasi interaktif, dan penyiapan venue pameran. ' +
      '17% untuk logistik transportasi karya seni dan mobilitas tim antar-pulau Jawa, Sumatera, dan Bali. ' +
      '18% untuk honorarium kurator, direktur, narasumber, dan tim kerja teknis. ' +
      '11% untuk dokumentasi foto/video kelas museum dan liputan publikasi. ' +
      'Serta pos kesekretariatan dan workshop pelajar gratis. Setiap rupiah dialokasikan dengan penuh tanggung jawab.',
    html:
      '<div class="s-body ed-duo ed-duo--budget">' +
      '<div class="ed-budget">' +
      '<div class="ed-budget__chart" data-anim="tumbuh">' +
      V.donut([
        { pct: 49.7, color: '#E0A537' },
        { pct: 17.1, color: '#45AEA4' },
        { pct: 18.5, color: '#D3CFC5' },
        { pct: 11.4, color: '#B4791A' },
        { pct: 3.3, color: '#6E6E78' }
      ], { size: 280, stroke: 22 }) +
      '<div class="ed-budget__total">' +
      '<div class="ed-label">Total Kebutuhan Anggaran</div>' +
      '<div class="ed-budget__v">Rp 1,97 Miliar</div>' +
      '</div>' +
      '</div>' +
      '<p class="ed-p ed-p--xs ed-budget__d">Biaya total penyelenggaraan tur pameran akbar di 3 kota besar: Yogyakarta, Bandar Lampung, dan Denpasar Bali.</p>' +
      '<p class="ed-budget__cta">Dibuka melalui skema Gotong-Royong Kemitraan Alumni & Sponsorship Industri</p>' +
      '</div>' +
      '<div class="ed-ledger ed-group">' +
      '<div class="ed-row"><i class="ed-row__dot" style="background:#E0A537"></i><div class="ed-row__txt"><b>1. Produksi Karya, Display & Venue 3 Kota</b><span>Penciptaan 150-200 karya, tata pamer display, sewa venue, konsumsi</span></div><div class="ed-row__val"><b>Rp 979,3 Jt</b><span>49,7%</span></div><div class="ed-row__bar"><i style="width:49.7%;background:#E0A537"></i></div></div>' +
      '<div class="ed-row"><i class="ed-row__dot" style="background:#45AEA4"></i><div class="ed-row__txt"><b>2. Transportasi & Akomodasi Lintas Pulau</b><span>Tiket pesawat, kargo karya Jogja-Lampung-Bali, akomodasi narasumber</span></div><div class="ed-row__val"><b>Rp 337,0 Jt</b><span>17,1%</span></div><div class="ed-row__bar"><i style="width:17.1%;background:#45AEA4"></i></div></div>' +
      '<div class="ed-row"><i class="ed-row__dot" style="background:#D3CFC5"></i><div class="ed-row__txt"><b>3. Honorarium Kurator, Direktur & Tim Kerja</b><span>Director, event director, kurator seni, narasumber ahli, 8 tim kerja</span></div><div class="ed-row__val"><b>Rp 365,0 Jt</b><span>18,5%</span></div><div class="ed-row__bar"><i style="width:18.5%;background:#D3CFC5"></i></div></div>' +
      '<div class="ed-row"><i class="ed-row__dot" style="background:#B4791A"></i><div class="ed-row__txt"><b>4. Dokumentasi Foto, Video & Liputan Media</b><span>Dokumentasi profesional, katalog hardcover museum, rilis media nasional</span></div><div class="ed-row__val"><b>Rp 225,0 Jt</b><span>11,4%</span></div><div class="ed-row__bar"><i style="width:11.4%;background:#B4791A"></i></div></div>' +
      '<div class="ed-row"><i class="ed-row__dot" style="background:#6E6E78"></i><div class="ed-row__txt"><b>5. Persiapan, Kesekretariatan & Workshop Pelajar</b><span>Rapat kerja, internet, listrik, sound system, konsumsi workshop pelajar</span></div><div class="ed-row__val"><b>Rp 64,6 Jt</b><span>3,3%</span></div><div class="ed-row__bar"><i style="width:3.3%;background:#6E6E78"></i></div></div>' +
      '</div>' +
      '</div>'
  });

  /* ---------------------------------------------------------------- Slide 14 */
  D.push({
    id: 's-14',
    chapter: 5,
    dark: true,
    num: 14,
    kicker: 'PELUANG KEMITRAAN &middot; SPONSORSHIP',
    title: 'Paket Kemitraan: Gotong Royong Alumni & Korporasi',
    widget: 'sponsor-tier-picker',
    footnote: 'Silakan klik pilihan paket kemitraan di atas untuk menjelajahi detail fasilitas dan skema dukungan.',
    notes: 'Inilah inti dari perjumpaan kita malam ini. Kami membuka pintu selebar-lebarnya bagi Bapak/Ibu alumni, baik atas nama korporasi, institusi, maupun ikatan angkatan/pribadi. ' +
      'Tersedia Paket Diamond 250 juta sebagai Mitra Utama Tur 3 Kota dengan hak paviliun eksklusif di GIK UGM. ' +
      'Paket Gold 150 juta dengan hak penamaan galeri tematik. ' +
      'Paket Silver 100 juta sebagai mitra pendukung publikasi bersama. ' +
      'Dan skema yang sangat kami dorong bagi alumni: Lab & Artwork Grant 25 sampai 50 juta rupiah, di mana Bapak/Ibu mengadopsi dan membiayai langsung produksi satu karya riset lab dosen atau mahasiswa kita, lengkap dengan plakat nama sponsor di samping karya.',
    html: ''
  });

})();
