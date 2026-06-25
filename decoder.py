from PIL import Image
import numpy as np
from utils import binary_to_text


def decode_image(image_path):
    img = Image.open(image_path).convert("L")
    img = img.resize((500, 500))

    arr = np.array(img)

    block_size = 50
    binary = ""

    for i in range(0, 500, block_size):
        for j in range(0, 500, block_size):

            block = arr[i:i+block_size, j:j+block_size]
            avg = np.mean(block)

            # threshold decoding
            if avg < 128:
                binary += "1"
            else:
                binary += "0"

    print(binary)
    binary = binary[:48]   # 6 chars × 8 bits
    text = binary_to_text(binary)

    if "#" in text:
        return text.split("#")[0]

    return text