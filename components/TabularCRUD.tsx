"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Papa from "papaparse";
import { csvTemplates, exportToCSV } from "@/lib/csv-utils";
import TableHeader from "./TableHeader";
import DataTable from "./DataTable";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type Column = {
  key: string;
  label: string;
  type?: "text" | "number" | "json" | "date";
  editable?: boolean;
};

interface TabularCRUDProps {
  facultyId: string;
  apiBase: string;
  title: string;
  columns: Column[];
  defaultQuery?: Record<string, string | number>;
  csvTemplateKey?: keyof typeof csvTemplates;
}

export default function TabularCRUD({
  facultyId,
  apiBase,
  title,
  columns,
  defaultQuery = {},
  csvTemplateKey,
}: TabularCRUDProps) {
  const base = apiBase.replace("{facultyId}", facultyId);
  const queryString = (q: Record<string, any>) =>
    "?" + new URLSearchParams(q as any).toString();

  const { data, mutate, isLoading } = useSWR(
    `${base}${queryString(defaultQuery)}`,
    fetcher
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [localRows, setLocalRows] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) setLocalRows(data.data);
  }, [data]);

  async function saveRow(row: any) {
    const isNew = !row.id || String(row.id).startsWith("__new__");
    const method = isNew ? "POST" : "PUT";

    await fetch(base, {
      method,
      body: JSON.stringify(row),
      headers: { "Content-Type": "application/json" },
    });
    await mutate();
    setEditingId(null);
  }

  async function deleteRow(id: string) {
    await fetch(`${base}?id=${id}`, { method: "DELETE" });
    await mutate();
  }

  function addBlankRow() {
    const blank = columns.reduce((acc, c) => {
      acc[c.key] = "";
      return acc;
    }, {} as any);

    blank.id = `__new__-${Date.now()}`;
    setLocalRows([blank, ...localRows]);
    setEditingId(blank.id); // just enter edit mode, no save yet
  }

  function exportAll() {
    if (!data?.data?.length) return alert("No data to export");
    exportToCSV({
      filename: `${title.toLowerCase().replace(/\s+/g, "-")}-${new Date()
        .toISOString()
        .slice(0, 10)}`,
      data: data.data,
    });
  }

  function handleCSVUpload(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        await fetch(base, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(results.data),
        });
        await mutate();
      },
    });
  }

  return (
    <div className="border rounded-md p-4">
      <TableHeader
        title={title}
        csvTemplateKey={csvTemplateKey}
        onExport={exportAll}
        onImport={handleCSVUpload}
        onAdd={addBlankRow}
      />

      <DataTable
        columns={columns}
        rows={localRows}
        isLoading={isLoading}
        editingId={editingId}
        setEditingId={setEditingId}
        saveRow={saveRow}
        deleteRow={deleteRow}
        resetData={() => mutate()}
        setLocalRows={setLocalRows}
      />
    </div>
  );
}
