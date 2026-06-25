from PIL import Image
import numpy as np
from utils import text_to_binary

def encode_image(input_path, text, output_path):
    img = Image.open(input_path).convert("L")

    # FIX SIZE for stable printing/scanning
    img = img.resize((500, 500))

    arr = np.array(img)

    marker_size = 30

    # Top Left
    arr[0:marker_size, 0:marker_size] = 0

    # Top Right
    arr[0:marker_size, -marker_size:] = 0

    # Bottom Left
    arr[-marker_size:, 0:marker_size] = 0

    # Bottom Right
    arr[-marker_size:, -marker_size:] = 0

    data = "12345#" # end marker
    binary = text_to_binary(data)

    block_size = 50
    idx = 0

    for i in range(0, 500, block_size):
        for j in range(0, 500, block_size):

            if idx >= len(binary):
                break

            bit = binary[idx]

            # HIGH contrast for print safety
            color = 30 if bit == "1" else 220

            arr[i:i+block_size, j:j+block_size] = color
            idx += 1

    Image.fromarray(arr).save(output_path)
    return output_path