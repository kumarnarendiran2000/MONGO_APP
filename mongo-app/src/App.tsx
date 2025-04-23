import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace this with your real upload API later
      const response = await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setMessage("✅ File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">📁 File Upload & Fetch Demo</h1>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Upload a File</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <div className="space-x-2">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {message && <span className="text-sm">{message}</span>}
        </div>
      </section>
    </div>
  );
}

export default App;
