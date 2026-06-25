def text_to_binary(text):
    return ''.join(format(ord(c), '08b') for c in text)

def binary_to_text(binary):
    chars = [binary[i:i+8] for i in range(0, len(binary), 8)]

    text = ""

    for c in chars:
        try:
            text += chr(int(c, 2))
        except:
            pass

    return text