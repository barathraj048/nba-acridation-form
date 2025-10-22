"use client";
import { Button } from "@/components/ui/button";

interface DownloadFacultyButtonProps {
  facultyId: string;
  facultyName?: string;
}

export function DownloadFacultyButton({ facultyId, facultyName }: DownloadFacultyButtonProps) {
  const download = async () => {
    try {
      // Pass facultyId as query parameter
      const res = await fetch(`/api/faculty/download-indudual?facultyId=${facultyId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `faculty_${facultyName || facultyId}_report.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download PDF. Check console for details.");
    }
  };

  return (
    <Button onClick={download} variant="outline">
      Download PDF Report
    </Button>
  );
}

// Usage example:
// <DownloadFacultyButton facultyId={faculty.id} facultyName={faculty.name} />