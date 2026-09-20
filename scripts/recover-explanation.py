import json

with open('src/data/copyright-act.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for chapter in data['chapters']:
    for section in chapter['sections']:
        title = section['title']
        # If explanation contains the template text, regenerate it with the corrected title
        if "সংক্রান্ত আইনি বিষয়াবলি ও এর প্রয়োগ নিয়ে আলোচনা করা হয়েছে।" in section.get('explanation', ''):
            section['explanation'] = f'এই ধারাটিতে মূল আইনের বিধান অনুযায়ী "{title}" সংক্রান্ত আইনি বিষয়াবলি ও এর প্রয়োগ নিয়ে আলোচনা করা হয়েছে।'

with open('src/data/copyright-act.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Explanations fixed.")
