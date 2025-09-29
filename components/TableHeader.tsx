import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Plus } from "lucide-react";
import { csvTemplates, exportToCSV } from "@/lib/csv-utils";

interface TableHeaderProps {
  title: string;
  csvTemplateKey?: keyof typeof csvTemplates;
  onExport: () => void;
  onImport: (file: File) => void;
  onAdd: () => void;
}

export default function TableHeader({
  title,
  csvTemplateKey,
  onExport,
  onImport,
  onAdd,
}: TableHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex gap-2">
        {csvTemplateKey && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const header = csvTemplates[csvTemplateKey][0];
              exportToCSV({
                filename: `${title}-template`,
                data: [
                  Object.fromEntries(Object.keys(header).map((k) => [k, ""])),
                ],
              });
            }}
          >
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
        )}

        <label className="cursor-pointer">
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImport(f);
            }}
          />
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
        </label>

        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>

        <Button type="button" onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </div>
  );
}
