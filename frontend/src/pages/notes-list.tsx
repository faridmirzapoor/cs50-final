"use client";
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
  columns: ColumnDef<Note>[];
  data: Note[];
  notes: Note[]; // اضافه کردن پراپ notes
}

// کامپوننت NotesList
export function NotesList({ columns, data, notes }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openNoteDetails = (note: Note) => {
    console.log("View Note Details:", note);
  };

  const editNote = (note: Note) => {
    console.log("Edit Note:", note);
  };

  const deleteNote = (note: Note) => {
    
  };

  return (
    <div className="rounded-md border">
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

// تعریف ستون‌های جدول
export const columns: ColumnDef<Note>[] = [
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
        >
          Delete
        </button>
      </div>
    ),
  },
];

// کامپوننت اصلی App
export default function App({ notes }: { notes: Note[] }) {
  return <NotesList columns={columns} data={notes} notes={notes} />;
}
