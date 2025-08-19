import { useState } from "react";
import axios from "axios";

function PasteForm() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("text");
  const [expiresIn, setExpiresIn] = useState(0);
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/pastes", {
        content,
        language,
        expiresIn, // in seconds
      });
      setSlug(res.data.slug); // save returned slug
    } catch (err) {
      console.error(err);
      alert("Error creating paste");
    }
  };

  const handleCopy = async () => {
    const url = `http://localhost:5173/paste/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded"
          placeholder="Paste your code or text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Language (optional)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Expire in seconds (0 = never)"
          value={expiresIn}
          onChange={(e) => setExpiresIn(Number(e.target.value))}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Paste
        </button>
      </form>

      {slug && (
        <p className="mt-4">
          Paste created! Visit:{" "}
          <a
            className="text-blue-600 underline"
            href={`http://localhost:5173/paste/${slug}`}
          >
            {slug}
          </a>
        </p>
        
      )}
      <h1>http://localhost:5173/paste/${slug}<button
      onClick={handleCopy}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Copy URL
    </button></h1>
    </div>
  );
}

export default PasteForm;
