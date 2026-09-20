import json
import codecs

# We know the file was corrupted by being decoded as cp850 (or cp1252/cp437) and saved as utf-8.
# Let's try cp850 first since E0 A6 95 -> Ó ª ò matches exactly cp850.
# E0 = Ó, A6 = ª, 95 = ò in cp850.

with open('src/data/copyright-act.json', 'r', encoding='utf-8') as f:
    text = f.read()

try:
    # Encode the string back to bytes using cp850 to recover original UTF-8 bytes
    recovered_bytes = text.encode('cp850')
    # Decode the recovered bytes as utf-8
    recovered_text = recovered_bytes.decode('utf-8')
    
    with open('src/data/copyright-act.json', 'w', encoding='utf-8') as f:
        f.write(recovered_text)
    print("Successfully recovered using cp850!")
except Exception as e:
    print("cp850 failed:", e)
    try:
        recovered_bytes = text.encode('cp437')
        recovered_text = recovered_bytes.decode('utf-8')
        with open('src/data/copyright-act.json', 'w', encoding='utf-8') as f:
            f.write(recovered_text)
        print("Successfully recovered using cp437!")
    except Exception as e2:
        print("cp437 failed:", e2)

