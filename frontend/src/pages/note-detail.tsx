import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Note {
  id: number;
  subject: string;
  description: string;
}

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoteDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/note-detail/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          setNote(response.data);
        } else {
          setError("Failed to fetch note details");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Note Detail</h1>
      {note ? (
        <div>
          <h2>{note.subject}</h2>
          <p>{note.description}</p>
        </div>
      ) : (
        <p>Note not found.</p>
      )}
    </div>
  );
};

export default NoteDetail;
