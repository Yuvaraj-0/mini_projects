import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PasteView() {
  const { slug } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        
        const res = await axios.get(`http://localhost:3002/api/pastes/${slug}`);
        setPaste(res.data);
      } catch (err) {
        console.error(err);
        setPaste({ error: "Paste not found or expired" });
      }
    };
    fetchPaste();
  }, [slug]);

  if (!paste) return <p>Loading...</p>;
  if (paste.error) return <p>{paste.error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-2">Slug: {paste.slug}</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{paste.content}</pre>
      <p className="mt-2 text-sm text-gray-500">Language: {paste.language}</p>
      <p className="text-sm text-gray-500">Views: {paste.views}</p>
    </div>
  );
}

export default PasteView;
