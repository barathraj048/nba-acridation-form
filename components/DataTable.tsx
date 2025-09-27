import React from "react";
import { Column } from "./TabularCRUD";
import TableRow from "./TableRow";

interface DataTableProps {
  columns: Column[];
  rows: any[];
  isLoading: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  saveRow: (row: any) => void;
  deleteRow: (id: string) => void;
  resetData: () => void;
  setLocalRows: (rows: any[]) => void;
}

export default function DataTable({
  columns,
  rows,
  isLoading,
  editingId,
  setEditingId,
  saveRow,
  deleteRow,
  resetData,
  setLocalRows,
}: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-2 py-2 text-left">
                {c.label}
              </th>
            ))}
            <th className="px-2 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, i) => (
            <TableRow
              key={row.id ?? i}
              row={row}
              index={i}
              columns={columns}
              isEditing={editingId === row.id}
              saveRow={saveRow}
              deleteRow={deleteRow}
              resetData={resetData}
              setEditingId={setEditingId}
              localRows={rows}
              setLocalRows={setLocalRows}
            />
          ))}

          {!rows?.length && !isLoading && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center text-gray-500 py-4"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
