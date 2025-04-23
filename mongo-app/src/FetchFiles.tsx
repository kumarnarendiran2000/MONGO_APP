import { useState } from "react";
import axios from "axios";

type FileItem = {
  id: number;
  title: string;
};

const FetchFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace this with your real GET /files later
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      setFiles(res.data);
    } catch (err) {
      setError(`❌ Failed to fetch files. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Fetched Files</h2>
      <button
        onClick={handleFetch}
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Fetching..." : "Fetch Files"}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700">
        {files.map((file) => (
          <li key={file.id}>{file.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default FetchFiles;
