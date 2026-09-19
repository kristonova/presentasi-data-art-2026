import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for sf in sorted(glob.glob('presentasi/assets/deck/slides-*.js')):
    print(f"\n==================== {sf} ====================")
    content = open(sf, encoding='utf-8').read()
    slides = content.split('D.push(')[1:]
    for s in slides:
        sid_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", s)
        num_match = re.search(r"num:\s*(\d+)", s)
        label_match = re.search(r"label:\s*['\"]([^'\"]+)['\"]", s)
        title_match = re.search(r"title:\s*['\"]([^'\"]*)['\"]", s)
        kicker_match = re.search(r"kicker:\s*['\"]([^'\"]*)['\"]", s)
        notes_match = re.search(r"notes:\s*('|\")([\s\S]*?)\1\s*,", s)

        sid = sid_match.group(1) if sid_match else '?'
        num = num_match.group(1) if num_match else '?'
        label = label_match.group(1) if label_match else ''
        title = title_match.group(1) if title_match else ''
        kicker = kicker_match.group(1) if kicker_match else ''
        notes = notes_match.group(2) if notes_match else ''
        print(f"[{num}] ({sid}) | Kicker: {kicker} | Title: {title} | Label: {label}")
        if notes:
            clean_notes = notes.replace("' +", "").replace("'", "").strip()
            print(f"     Notes: {clean_notes[:100]}...")

