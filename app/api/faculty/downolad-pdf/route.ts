  import { prisma } from "@/lib/prisma";
  import PDFDocument from "pdfkit";
  import fs from "fs";
  import path from "path";
  import { NextResponse } from "next/server";

  export async function GET() {
    try {
      const faculties = await prisma.faculty.findMany({
        include: {
          journals: true,
          conferences: true,
          books: true,
          patents: true,
          nptelCourses: true,
          awards: true,
          fundingResearch: true,
          phdGuided: true,
          consulting: true,
          mous: true,
          seminars: true,
          invitedTasks: true,
        },
      });

      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        const chunks: Uint8Array[] = [];

        const fontPath = path.join(process.cwd(), "public/fonts/ARIAL.TTF");
        if (fs.existsSync(fontPath)) {
          doc.font(fontPath);
        } else {
          doc.font("Times-Roman");
        }

        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", (err) => reject(err));

        doc.fontSize(18).text("Faculty Data", { align: "center", underline: true });
        doc.moveDown();

        faculties.forEach((f) => {
          doc.fontSize(14).text(`Name: ${f.name}`);
          doc.fontSize(12).text(`Department: ${f.department}`);
          doc.text(`Joining Year: ${f.joiningYear}`);
          doc.text(`Qualification: ${f.qualification}`);
          doc.text(`Email: ${f.email}`);
          doc.text(`Phone: ${f.phone}`);
          doc.moveDown();

          if (f.journals.length) {
            doc.fontSize(12).text("Journals:", { underline: true });
            f.journals.forEach((j) => {
              doc.text(`- ${j.paperTitle} (${j.journalName}, ${j.year})`);
            });
            doc.moveDown();
          }

          doc.moveDown();
          doc.text("-----------------------------------------------------");
          doc.moveDown();
        });

        doc.end();
      });

      // Convert Buffer to Uint8Array for NextResponse
      const pdfArray = new Uint8Array(pdfBuffer);

      return new NextResponse(pdfArray, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=faculty_data.pdf",
        },
      });
    } catch (error: any) {
      console.error("PDF generation error:", error);
      return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
  }
