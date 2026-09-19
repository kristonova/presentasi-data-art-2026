import zipfile, xml.etree.ElementTree as ET, re
from collections import Counter

pptx_path = r'D:\PROJECT\Universitas Gadjah Mada\Data Art 2026\presentasi workshop\Workshop_DataArt2026_Kerja_Saintis_Kerja_Seni.pptx'

fonts = Counter()
colors = Counter()
slide_layouts = []

with zipfile.ZipFile(pptx_path, 'r') as z:
    for name in sorted(z.namelist()):
        if name.startswith('ppt/slides/slide') and name.endswith('.xml'):
            content = z.read(name).decode('utf-8')
            for tf in re.findall(r'typeface="([^"]+)"', content):
                fonts[tf] += 1
            for clr in re.findall(r'<a:srgbClr val="([^"]+)"', content):
                colors[clr.upper()] += 1
            for sch in re.findall(r'<a:schemeClr val="([^"]+)"', content):
                colors['SCHEME:' + sch] += 1

print("--- FONTS ---")
for f, c in fonts.most_common(15):
    print(f"  {f}: {c}")

print("\n--- COLORS (HEX / SCHEME) ---")
for clr, c in colors.most_common(25):
    print(f"  {clr}: {c}")

# Also read theme1.xml to see theme color scheme and fonts
with zipfile.ZipFile(pptx_path, 'r') as z:
    if 'ppt/theme/theme1.xml' in z.namelist():
        theme = z.read('ppt/theme/theme1.xml').decode('utf-8')
        print("\n--- THEME 1 FONTS ---")
        for m in re.findall(r'<a:(majorFont|minorFont)>.*?<a:latin typeface="([^"]+)".*?</a:\1>', theme, re.DOTALL):
            print(f"  {m[0]}: {m[1]}")
        print("\n--- THEME 1 COLOR SCHEME ---")
        for m in re.findall(r'<a:([a-zA-Z0-9]+)>\s*<a:srgbClr val="([^"]+)"', theme):
            print(f"  {m[0]}: #{m[1]}")
