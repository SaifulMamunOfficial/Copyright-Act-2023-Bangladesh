import json
import re

def fix_string(s):
    if not isinstance(s, str):
        return s
        
    # Check if string contains typical mojibake characters
    if not ("Ó" in s or "º" in s or "ª" in s):
        return s
        
    # We have some un-encodable characters like smart quotes.
    # We can replace them with placeholders, do the encode/decode, then put them back.
    # Or just use 'surrogateescape' or 'xmlcharrefreplace'.
    
    # Actually, if we encode with cp850 ignoring errors, we lose them.
    # Let's map known unencodable characters to placeholders:
    placeholders = {
        '\u201c': '__LQ__', # “
        '\u201d': '__RQ__', # ”
        '\u2018': '__LSQ__', # ‘
        '\u2019': '__RSQ__', # ’
        '\u200c': '__ZWNJ__', # ZWNJ
        '\u2013': '__ENDASH__', # –
        '\u2014': '__EMDASH__', # —
    }
    
    temp = s
    for k, v in placeholders.items():
        temp = temp.replace(k, v)
        
    try:
        # Encode with cp850
        bytes_val = temp.encode('cp850')
        fixed = bytes_val.decode('utf-8')
        
        # Restore placeholders
        for k, v in placeholders.items():
            fixed = fixed.replace(v, k)
            
        if any('\u0980' <= c <= '\u09FF' for c in fixed):
            return fixed
    except Exception as e:
        print(f"cp850 still failed: {e}")
        pass
        
    # If cp850 fails, fallback to cp1252
    try:
        bytes_val = temp.encode('cp1252')
        fixed = bytes_val.decode('utf-8')
        for k, v in placeholders.items():
            fixed = fixed.replace(v, k)
        if any('\u0980' <= c <= '\u09FF' for c in fixed):
            return fixed
    except Exception as e:
        pass
        
    return s

def recursive_fix(data):
    if isinstance(data, dict):
        return {k: recursive_fix(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [recursive_fix(v) for v in data]
    elif isinstance(data, str):
        return fix_string(data)
    else:
        return data

with open('src/data/copyright-act.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

fixed_data = recursive_fix(data)

with open('src/data/copyright-act.json', 'w', encoding='utf-8') as f:
    json.dump(fixed_data, f, ensure_ascii=False, indent=2)

print("Remaining JSON fixed.")
