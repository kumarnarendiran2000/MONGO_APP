import { useState, useRef } from "react";
import axios from "axios";
import FetchFiles from "./FetchFiles";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("https://httpbin.org/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ File uploaded successfully!");
      setFile(null);

      // Reset input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage("❌ Upload failed. Please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">📁 File Upload & Fetch Demo</h1>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded shadow max-w-xl mx-auto mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload a File</h2>

        <label className="block border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <span className="text-gray-500">
            {file ? file.name : "Click to choose a file"}
          </span>
        </label>

        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
        )}
      </section>

      {/* Fetch Section */}
      <FetchFiles />
    </div>
  );
}

export default App;
