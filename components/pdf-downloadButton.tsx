"use client";
import { Button } from "@/components/ui/button";

export function DownloadFacultyButton() {
  const download = async () => {
    const res = await fetch("/api/download/faculty");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faculty_data.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={download}>Download Faculty PDF</Button>;
}
