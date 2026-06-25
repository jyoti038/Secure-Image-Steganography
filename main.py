from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil

from encoder import encode_image
from decoder import decode_image

app = FastAPI()

# CORS Fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve images/files
app.mount("/files", StaticFiles(directory="."), name="files")


@app.get("/")
def home():
    return {"message": "Steganography API Running"}


# ENCODE
@app.post("/encode")
def encode():
    input_img = "input_image.png"
    output_img = "encoded_output.png"

    result = encode_image(
        input_img,
        "12345",
        output_img
    )

    return {
        "message": "Image encoded successfully",
        "output_file": f"/files/{result}"
    }


# DECODE
@app.post("/decode")
def decode(file: UploadFile = File(...)):
    temp_path = "uploaded.png"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = decode_image(temp_path)

    return {
        "decoded_text": result
    }