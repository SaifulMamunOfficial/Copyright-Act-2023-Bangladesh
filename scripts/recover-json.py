import json

def fix_string(s):
    if not isinstance(s, str):
        return s
    
    # Try cp850 (typical Windows console encoding)
    try:
        fixed = s.encode('cp850').decode('utf-8')
        # Ensure it actually changed and looks like Bengali (has Bengali unicode range)
        if any('\u0980' <= c <= '\u09FF' for c in fixed):
            return fixed
    except:
        pass
        
    # Try cp1252 (typical Windows ANSI)
    try:
        fixed = s.encode('cp1252').decode('utf-8')
        if any('\u0980' <= c <= '\u09FF' for c in fixed):
            return fixed
    except:
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

# Load JSON
with open('src/data/copyright-act.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Fix recursively
fixed_data = recursive_fix(data)

# Save JSON
with open('src/data/copyright-act.json', 'w', encoding='utf-8') as f:
    json.dump(fixed_data, f, ensure_ascii=False, indent=2)

print("Fixed JSON saved.")
