import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [decodeFile, setDecodeFile] = useState(null);
  const [decodedText, setDecodedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [encodedImage, setEncodedImage] = useState("");

  // ✅ ENCODE IMAGE
  const encodeImage = async () => {
    try {
      setLoading(true);

      await axios.post(`${API}/encode`);

      setEncodedImage(
        `${API}/files/encoded_output.png?t=${Date.now()}`
      );

      alert("Encoded Image Generated Successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Encoding Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DECODE IMAGE
  const decodeImage = async () => {
    if (!decodeFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", decodeFile);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/decode`,
        formData
      );

      setDecodedText(res.data.decoded_text);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Decoding Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "white",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "750px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "35px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      }}>

        <h1 style={{
          textAlign: "center",
          fontSize: "2.8rem",
          fontWeight: "700",
          marginBottom: "10px",
        }}>
          Secure Image Steganography
        </h1>

        <p style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "30px",
        }}>
          Encode and decode hidden information inside images
        </p>

        {/* ENCODE */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}>
          <h3>Generate Encoded Image</h3>

          <button
            onClick={encodeImage}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Generate Image
          </button>
        </div>

        {/* ENCODED IMAGE */}
        {encodedImage && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
            textAlign: "center",
          }}>
            <h3>Encoded Image Preview</h3>

            <img
              src={encodedImage}
              alt="Encoded"
              style={{
                width: "100%",
                maxHeight: "350px",
                objectFit: "contain",
                borderRadius: "12px",
                marginTop: "15px",
              }}
            />

            <a
              href={encodedImage}
              download
              style={{
                display: "inline-block",
                marginTop: "15px",
                background: "#f59e0b",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Download Image
            </a>
          </div>
        )}

        {/* DECODE */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: "20px",
          borderRadius: "12px",
        }}>
          <h3>Decode Hidden Message</h3>

          <input
            type="file"
            onChange={(e) => setDecodeFile(e.target.files[0])}
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              width: "100%",
            }}
          />

          <button
            onClick={decodeImage}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Decode Image
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Processing...
          </p>
        )}

        {/* RESULT */}
        {decodedText && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            background: "rgba(74, 222, 128, 0.1)",
            border: "1px solid rgba(74,222,128,0.3)",
            borderRadius: "12px",
          }}>
            <h3>Decoded Message</h3>

            <p style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#4ade80",
            }}>
              {decodedText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;