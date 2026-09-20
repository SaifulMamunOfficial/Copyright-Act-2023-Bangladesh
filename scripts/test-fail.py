import json

with open('src/data/copyright-act.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for c in data['chapters']:
    for s in c['sections']:
        text = s['original_law_text']
        if "Óº«" in text or "Ó" in text:
            try:
                text.encode('cp850')
            except Exception as e:
                print(f"cp850 failed on {s['id']}: {e}")
            try:
                text.encode('cp1252')
            except Exception as e:
                print(f"cp1252 failed on {s['id']}: {e}")
            try:
                text.encode('cp437')
            except Exception as e:
                print(f"cp437 failed on {s['id']}: {e}")
