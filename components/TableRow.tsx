import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Column } from "./TabularCRUD";
import TableCell from "./TableCell";

interface TableRowProps {
  row: any;
  index: number;
  columns: Column[];
  isEditing: boolean;
  saveRow: (row: any) => void;
  deleteRow: (id: string) => void;
  resetData: () => void;
  setEditingId: (id: string | null) => void;
  localRows: any[];
  setLocalRows: (rows: any[]) => void;
}

export default function TableRow({
  row,
  index,
  columns,
  isEditing,
  saveRow,
  deleteRow,
  resetData,
  setEditingId,
  localRows,
  setLocalRows,
}: TableRowProps) {
  return (
    <tr className="border-t">
      {columns.map((col) => (
        <TableCell
          key={col.key}
          col={col}
          row={row}
          rowIndex={index}
          isEditing={isEditing}
          localRows={localRows}
          setLocalRows={setLocalRows}
        />
      ))}

      <td className="px-2 py-2">
        {isEditing ? (
          <div className="flex gap-2">
            {/* Only save when user clicks Save */}
            <Button size="sm" onClick={() => saveRow(localRows[index])}>
              <Edit className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingId(null);
                resetData(); // just discard changes
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingId(row.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteRow(row.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}
