"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// تعریف مدل Note
interface Note {
  id: number;
  subject: string;
  description: string;
}

// تعریف تایپ DataTableProps
interface DataTableProps {
  data: Note[];
}

export function NotesList({ data }: DataTableProps) {
  const [notesState, setNotes] = useState<Note[]>(data);
  const [error, setError] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  // باز کردن جزئیات نوت
  const openNoteDetails = (note: Note) => {
    console.log("View Note Details:", note);
  };

  // ویرایش نوت
  const editNote = (note: Note) => {
    console.log("Edit Note:", note);
  };

  // حذف نوت
  const deleteNote = async (note: Note) => {
    setSelectedNoteId(note.id);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated!");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete-note/?id=${note.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      console.log("Deleting note with ID:", note.id);
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // حذف نوت از حالت محلی
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSelectedNoteId(null);
    }
  };

  // تعریف ستون‌ها
  const columns: ColumnDef<Note>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => openNoteDetails(row.original)}
          >
            View
          </button>
          <button
            className="px-2 py-1 bg-green-500 text-white rounded"
            onClick={() => editNote(row.original)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => deleteNote(row.original)}
            disabled={selectedNoteId === row.original.id}
          >
            {selectedNoteId === row.original.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: notesState,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No notes found. Add some!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// کامپوننت اصلی
export default function App({ notes }: { notes: Note[] }) {
  return <NotesList data={notes} />;
}
