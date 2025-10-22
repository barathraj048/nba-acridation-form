"use client";
import { Button } from "@/components/ui/button";

export function DownloadFacultyButton() {
  const download = async () => {
    try {
      const res = await fetch("/api/faculty/download-pdf");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "faculty_data.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download PDF. Check console for details.");
    }
  };

  return <Button onClick={download}>Download Faculty PDF</Button>;
}
