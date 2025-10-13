import { prisma } from "@/lib/prisma";
import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("dept");

    // Fetch faculty data (optionally filtered by department)
    const faculties = await prisma.faculty.findMany({
      where: department
        ? { department: department.toUpperCase() as any }
        : undefined,
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

    if (!faculties.length) {
      return NextResponse.json(
        { error: "No faculty data found for the selected department." },
        { status: 404 }
      );
    }

    // Initialize PDF document
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const chunks: Uint8Array[] = [];

    // Use custom font if available
    const fontPath = path.join(process.cwd(), "public/fonts/ARIAL.TTF");
    if (fs.existsSync(fontPath)) doc.font(fontPath);
    else doc.font("Times-Roman");

    // Collect chunks to build buffer later
    doc.on("data", (chunk) => chunks.push(chunk));
    const endPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // ---------- PDF CONTENT ----------
    doc.fontSize(18).text("Faculty Data Report", { align: "center", underline: true });
    doc.moveDown();

    if (department) {
      doc.fontSize(14).text(`Department: ${department}`, { align: "center" });
      doc.moveDown();
    }

    faculties.forEach((f, index) => {
      doc.fontSize(14).text(`${index + 1}. ${f.name}`, { underline: true });
      doc.fontSize(12).text(`Department: ${f.department}`);
      doc.text(`Joining Year: ${f.joiningYear}`);
      doc.text(`Qualification: ${f.qualification}`);
      doc.text(`Email: ${f.email}`);
      doc.text(`Phone: ${f.phone}`);
      doc.moveDown(0.5);

      // Journals Section
      if (f.journals.length) {
        doc.fontSize(12).text("Journals:", { underline: true });
        f.journals.forEach((j, i) => {
          doc.text(`${i + 1}. ${j.paperTitle} (${j.journalName}, ${j.year})`);
        });
        doc.moveDown();
      }

      // Conferences Section
      if (f.conferences.length) {
        doc.fontSize(12).text("Conferences:", { underline: true });
        f.conferences.forEach((c, i) => {
          doc.text(`${i + 1}. ${c.paperTitle} (${c.conferenceName}, ${c.year})`);
        });
        doc.moveDown();
      }

      // Patents Section
      if (f.patents.length) {
        doc.fontSize(12).text("Patents:", { underline: true });
        f.patents.forEach((p, i) => {
          doc.text(`${i + 1}. ${p.patentTitle} - ${p.status} (${p.year})`);
        });
        doc.moveDown();
      }

      // Awards Section
      if (f.awards.length) {
        doc.fontSize(12).text("Awards:", { underline: true });
        f.awards.forEach((a, i) => {
          doc.text(`${i + 1}. ${a.awardName} (${a.year})`);
        });
        doc.moveDown();
      }

      // Consulting / Funding / PhD Sections (Optional)
      if (f.consulting.length) {
        doc.fontSize(12).text("Consulting Projects:", { underline: true });
        f.consulting.forEach((c, i) => {
          doc.text(`${i + 1}. ${c.projectTitle} (${c.companyName}, ₹${c.amount}, ${c.year})`);
        });
        doc.moveDown();
      }

      if (f.fundingResearch.length) {
        doc.fontSize(12).text("Funding Research:", { underline: true });
        f.fundingResearch.forEach((r, i) => {
          doc.text(`${i + 1}. ${r.proposalTitle} (${r.agencyName}, ₹${r.amount}, ${r.yearReceived})`);
        });
        doc.moveDown();
      }

      if (f.phdGuided.length) {
        doc.fontSize(12).text("PhD Guided:", { underline: true });
        f.phdGuided.forEach((p, i) => {
          doc.text(`${i + 1}. ${p.candidateName} - ${p.status} (${p.researchYear})`);
        });
        doc.moveDown();
      }

      doc.text("---------------------------------------------------------------");
      doc.moveDown();
    });

    doc.end();

    // Await PDF buffer
    const pdfBuffer = await endPromise;
    const pdfArray = new Uint8Array(pdfBuffer);

    const filename = department
      ? `faculty_data_${department}.pdf`
      : "faculty_data.pdf";

    return new NextResponse(pdfArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
