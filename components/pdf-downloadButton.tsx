"use client";
import { Button } from "@/components/ui/button";

export default function DownloadPDFButton() {
  const downloadPDF = async () => {
    const res = await fetch("/api/faculty/downolad-pdf");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty_data.pdf";
    a.click();
  };

  return (
    <Button onClick={downloadPDF}>
      Download Faculty Data PDF
    </Button>
  );
}
