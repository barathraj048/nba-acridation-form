import React from "react";
import { Column } from "./TabularCRUD";

interface TableCellProps {
  col: Column;
  row: any;
  rowIndex: number;
  isEditing: boolean;
  localRows: any[];
  setLocalRows: (rows: any[]) => void;
}

export default function TableCell({
  col,
  row,
  rowIndex,
  isEditing,
  localRows,
  setLocalRows,
}: TableCellProps) {
  if (isEditing && col.editable !== false && col.type !== "json") {
    return (
      <td className="px-2 py-2 align-top">
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={row[col.key] ?? ""}
          onChange={(e) => {
            const copy = [...localRows];
            copy[rowIndex] = {
              ...copy[rowIndex],
              [col.key]:
                col.type === "number" ? Number(e.target.value) : e.target.value,
            };
            setLocalRows(copy);
          }}
        />
      </td>
    );
  }

  return (
    <td className="px-2 py-2 align-top">
      {col.type === "json" ? (
        <pre className="max-w-xs truncate">
          {typeof row[col.key] === "object"
            ? JSON.stringify(row[col.key])
            : row[col.key]}
        </pre>
      ) : (
        <div className="truncate max-w-xs">{row[col.key]}</div>
      )}
    </td>
  );
}
