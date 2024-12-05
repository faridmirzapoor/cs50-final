import { useEffect, useState } from "react";
import NotesList from "../pages/notes-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Note {
  id: number;
  subject: string;
  description: string;
}

const MainLayout = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/user-notes/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data: Note[] = await response.json();
        setNotes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Notes</h1>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <>
          <NotesList notes={notes} />
          <DialogDemo />
        </>
      )}
    </div>
  );
};

interface DialogDemoProps {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const DialogDemo = ({ setNotes }: DialogDemoProps) => {
  const [subject, setSubject] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const handleAddNote = async() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("User not authenticated!")
      return
    }
    const newNote = {subject, description}
    try {
      const response = await fetch("http://127.0.0.1:8000/add-note/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      // پس از اضافه شدن نوت جدید، نوت‌ها را دوباره از سرور دریافت کنید
      const updatedNotes: Note[] = await response.json();
      setNotes(updatedNotes);  // وضعیت نوت‌ها را به‌روزرسانی کنید
      setSubject("");  // پاک کردن فیلدهای ورودی پس از ارسال
      setDescription("");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-6">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>New Note?</DialogTitle>
          <DialogDescription>
            Write subject & description
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Subject
            </Label>
              <Input id="name" value={subject} className="col-span-3" onChange={(e) => setSubject(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input id="username" value={description} className="col-span-3" onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddNote}>Add Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MainLayout;
