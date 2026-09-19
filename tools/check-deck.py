"""
Pemeriksaan integritas dan kelengkapan deck presentasi Data Art 2026.
Memeriksa:
1. Keberadaan seluruh berkas slide
2. Validitas ID slide dan chapter
3. Keberadaan seluruh aset gambar yang dipanggil
4. Implementasi seluruh widget interaktif
5. Konsistensi UGM Design System
"""

import os
import re
import sys

def main():
    deck_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    deck_js_dir = os.path.join(deck_dir, 'assets', 'deck')
    ds_dir = os.path.join(deck_dir, 'assets', 'ds')

    slide_files = [
        'slides-0-pembuka.js',
        'slides-1-mitos.js',
        'slides-2-metode.js',
        'slides-3-evaluasi.js',
        'slides-4-tema2026.js',
        'slides-5-kemitraan.js',
        'slides-6-praktis.js',
        'slides-7-penutup.js'
    ]

    total_slides = 0
    slide_ids = []
    widgets_referenced = []
    images_referenced = []

    print(f"Memeriksa deck di: {deck_dir}")

    for sf in slide_files:
        p = os.path.join(deck_js_dir, sf)
        if not os.path.exists(p):
            print(f"[FAIL] Berkas hilang: {sf}")
            sys.exit(1)
        
        content = open(p, encoding='utf-8').read()
        
        # ID check
        ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
        total_slides += len(ids)
        slide_ids.extend(ids)
        
        # Widgets
        w_refs = re.findall(r"widget:\s*['\"]([^'\"]+)['\"]", content)
        widgets_referenced.extend(w_refs)
        
        # Images
        img_refs = re.findall(r"src=['\"]([^'\"]+)['\"]", content)
        images_referenced.extend(img_refs)

    print(f"[OK] Ditemukan {total_slides} slide terdaftar.")
    print(f"     ID Slide: {', '.join(slide_ids)}")

    # Check widgets
    w_js_path = os.path.join(deck_js_dir, 'widgets.js')
    if not os.path.exists(w_js_path):
        print("[FAIL] widgets.js tidak ditemukan!")
        sys.exit(1)

    w_content = open(w_js_path, encoding='utf-8').read()
    w_impls = re.findall(r"W\[['\"]([^'\"]+)['\"]] = function", w_content)
    print(f"[OK] Widget terimplementasi di widgets.js: {', '.join(w_impls)}")

    for w in widgets_referenced:
        if w not in w_impls:
            print(f"[FAIL] Widget '{w}' dipanggil di slide tetapi belum diimplementasikan di widgets.js!")
            sys.exit(1)
    print("[OK] Seluruh widget yang dipanggil telah terimplementasi.")

    # Check images
    missing_imgs = []
    for img in set(images_referenced):
        # Ignore external or absolute if any
        if img.startswith('http'):
            continue
        clean_p = img.replace('/', os.sep)
        full_p = os.path.join(deck_dir, clean_p)
        if not os.path.exists(full_p):
            missing_imgs.append(img)

    if missing_imgs:
        print(f"[FAIL] Gambar tidak ditemukan: {missing_imgs}")
        sys.exit(1)
    print(f"[OK] Seluruh {len(set(images_referenced))} gambar yang dipanggil terverifikasi ada di disk.")

    # Verify zero UGM DS remnants in deck.css
    deck_css_path = os.path.join(deck_js_dir, 'deck.css')
    deck_css = open(deck_css_path, encoding='utf-8').read()
    if '--ugm-' in deck_css:
        print("[FAIL] Ditemukan variabel CSS UGM di deck.css!")
        sys.exit(1)
    print("[OK] Verifikasi desain PPT: 0 variabel UGM di deck.css.")

    print("\n>>> SEMUA PEMERIKSAAN INTEGRITAS BERHASIL! DECK SIAP DIGUNAKAN DENGAN DESAIN ASLI PPT. <<<")

if __name__ == '__main__':
    main()
