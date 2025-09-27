// components/JsonModal.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function JsonModal({ open, value, onClose, onSave }: { open: boolean; value: any; onClose: () => void; onSave: (val: any) => void }) {
  const [text, setText] = React.useState(JSON.stringify(value ?? "", null, 2));
  React.useEffect(() => setText(JSON.stringify(value ?? "", null, 2)), [value]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-4 w-11/12 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Edit structured field</h3>
        <textarea className="w-full h-56 border p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            try {
              const parsed = JSON.parse(text);
              onSave(parsed);
              onClose();
            } catch (err) {
              // fallback: save as plain text
              onSave(text);
              onClose();
            }
          }}>Save</Button>
        </div>
      </div>
    </div>
  );
}
