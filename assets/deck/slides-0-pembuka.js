/* ===========================================================================
   Bab 0: Pembuka & Konteks Insight Session (Slide 1 – 2)
   Narasumber: Krisostomus Nova Rahmanto, S.Kom., M.Sc.
   Acara: Malam Kangen FMIPA UGM 2026 — Dies Natalis ke-71
   Sesi: Insight Session: Sustainable Life (Sabtu, 19 September 2026)
   =========================================================================== */

(function () {
  'use strict';
  var D = (window.DECK = window.DECK || []);
  var V = window.VIZ;

  /* ---------------------------------------------------------------- Slide 1 */
  D.push({
    id: 's-01',
    chapter: 0,
    layout: 'title',
    dark: true,
    num: 1,
    label: 'Sampul Insight Session',
    notes: 'Selamat malam Bapak Dekan Prof. Kuwat Triyana, Bapak Wakil Dekan Dr. Wiwit Suryanto, para guru besar kami, bapak ibu dosen, serta rekan-rekan alumni MIPA lintas generasi yang saya banggakan. ' +
      'Malam ini kita berkumpul dalam kehangatan Dies Natalis ke-71 dengan tema besar: Sains Berdampak. ' +
      'Dalam sesi Insight Session bertajuk Sustainable Life malam ini, izinkan saya mewakili rekan-rekan inisiator berbagi sebuah ikhtiar gotong-royong: bagaimana riset sains unggul yang lahir dari Sekip Utara kita bawa menyapa jutaan masyarakat luas melalui Data Art 2026 di tiga kota.',
    html:
      '<div class="title-art" style="background-image: url(\'assets/figures/karya_matematika_collatz.jpg\');"></div>' +
      '<div>' +
      '<div class="title-kicker">DIES NATALIS FMIPA UGM KE-71 &middot; MALAM KANGEN 2026</div>' +
      '<h1 class="title-h1">Menghidupkan Sains,<br>Merawat Masa Depan</h1>' +
      '<p class="title-sub">Insight Session: <i>Sustainable Life</i> &bull; Membawa Riset Sains FMIPA UGM<br>ke Ruang Publik Melalui Perhelatan Data Art 2026 di Tiga Kota</p>' +
      '</div>' +
      '<div class="title-meta">' +
      '<b>Krisostomus Nova Rahmanto, S.Kom., M.Sc.</b>' +
      'Founder Sadasa Academy &middot; Alumni FMIPA UGM<br>' +
      'Sabtu, 19 September 2026 &middot; Selasar Gedung D FMIPA UGM' +
      '</div>'
  });

  /* ---------------------------------------------------------------- Slide 2 */
  D.push({
    id: 's-02',
    chapter: 0,
    dark: false,
    cls: 'ed-split',
    num: 2,
    kicker: 'REFLEKSI & TITIK TEMU',
    title: 'Ketika Sains Melangkah Keluar dari Dinding Laboratorium',
    footnote: 'Tema Dies Natalis ke-71: "Sains Berdampak: Akselerasi Inovasi Global untuk Kemandirian Bangsa"',
    notes: 'Bapak dan Ibu sekalian, kita semua dididik di fakultas ini dengan standar logika yang ketat: presisi, pembuktian, dan akurasi data. ' +
      'Tetapi ada satu pertanyaan mendasar yang patut kita renungkan bersama di malam kangen ini: seberapa jauh temuan riset kita di laboratorium dirasakan manfaatnya oleh masyarakat di luar kampus? ' +
      'Sains yang sustainable bukan hanya sains yang selesai di lembar jurnal, melainkan sains yang mampu menyentuh kesadaran publik. ' +
      'Itulah alasan mengapa gerakan Data Art ini lahir: menjembatani kecerdasan logika MIPA dengan rasa seni kebudayaan kita.',
    html:
      '<figure class="ed-bleed" data-anim="pudar">' +
      '<img src="assets/figures/jogja_gallery_opening.jpg" alt="Suasana Pameran Data Art di Jogja Gallery">' +
      '<figcaption class="ed-bleed__cap">Pembukaan Data Art 2025 di Jogja Gallery &mdash; ruang temu sains kampus dengan ribuan masyarakat luas.</figcaption>' +
      '</figure>' +
      '<div class="s-body ed-center">' +
      '<div class="ed-points ed-group">' +
      V.point('01', 'Sains yang Menghidupkan (Sustainable Life)', 'Riset di MIPA tidak hanya memecahkan angka di atas kertas; sains kita menjaga denyut kehidupan &mdash; kesehatan manusia, kelestarian iklim, pemantauan bumi, hingga kecerdasan buatan.') +
      V.point('02', 'Tantangan Keterhubungan Publik', 'Sering kali hasil riset terbaik terkurung dalam bahasa rumus yang berjarak dari masyarakat luas yang sesungguhnya paling membutuhkan pemahaman atas sains tersebut.') +
      V.point('03', 'Data Art sebagai Jembatan Rasa', 'Seni data menerjemahkan matriks angka laboratorium menjadi pengalaman visual dan emosional yang menggugah nurani, menjadikan sains milik bersama.') +
      '</div>' +
      '</div>'
  });

})();
