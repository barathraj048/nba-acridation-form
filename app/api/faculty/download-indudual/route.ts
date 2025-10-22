import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsPDF } from "jspdf";

export async function GET(request: Request) {
  try {
    // Get facultyId from query params
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('facultyId');

    // Fetch faculty data based on ID or all
    const faculties = facultyId 
      ? await prisma.faculty.findMany({ 
          where: { id: facultyId },
          include: { 
            awards: true,
            journals: true,
            conferences: true,
            books: true,
            patents: true,
            nptelCourses: true,
            fundingResearch: true,
            phdGuided: true,
            consulting: true,
            mous: true,
            seminars: true,
            invitedTasks: true
          } 
        })
      : await prisma.faculty.findMany({ 
          include: { 
            awards: true,
            journals: true,
            conferences: true,
            books: true,
            patents: true,
            nptelCourses: true,
            fundingResearch: true,
            phdGuided: true,
            consulting: true,
            mous: true,
            seminars: true,
            invitedTasks: true
          } 
        });

    if (faculties.length === 0) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const maxWidth = 180;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace = 10) => {
      if (yPos > pageHeight - requiredSpace) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Helper function to add wrapped text
    const addText = (text: string, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        checkPageBreak();
        doc.text(line, margin, yPos);
        yPos += fontSize * 0.4;
      });
    };

    // Title
    doc.setFontSize(20);
    const title = faculties.length === 1 
      ? `Faculty Report - ${faculties[0].name}`
      : "Complete Faculty Report";
    doc.text(title, 105, yPos, { align: "center" });
    yPos += 15;

    faculties.forEach((faculty, index) => {
      checkPageBreak(30);

      // Faculty Header
      doc.setFillColor(230, 230, 230);
      doc.rect(margin - 5, yPos - 5, maxWidth + 10, 10, "F");
      doc.setFontSize(16);
      doc.text(`${index + 1}. ${faculty.name}`, margin, yPos);
      yPos += 12;

      // Basic Details
      doc.setFontSize(11);
      addText(`Department: ${faculty.department}`);
      addText(`Joining Year: ${faculty.joiningYear}`);
      addText(`Qualification: ${faculty.qualification}`);
      addText(`Email: ${faculty.email}`);
      addText(`Phone: ${faculty.phone}`);
      
      if (faculty.googleScholar) addText(`Google Scholar: ${faculty.googleScholar}`);
      if (faculty.scopusUrl) addText(`Scopus: ${faculty.scopusUrl}`);
      if (faculty.webOfScience) addText(`Web of Science: ${faculty.webOfScience}`);
      yPos += 5;

      // Journals
      if (faculty.journals.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Journal Publications", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.journals.forEach((journal, idx) => {
          checkPageBreak(12);
          addText(`${idx + 1}. ${journal.paperTitle}`);
          addText(`   Journal: ${journal.journalName}, Year: ${journal.year}`);
          if (journal.impactFactor) addText(`   Impact Factor: ${journal.impactFactor}`);
          if (journal.doi) addText(`   DOI: ${journal.doi}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Conferences
      if (faculty.conferences.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Conference Publications", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.conferences.forEach((conf, idx) => {
          checkPageBreak(10);
          addText(`${idx + 1}. ${conf.paperTitle}`);
          addText(`   Conference: ${conf.conferenceName}, Year: ${conf.year}`);
          if (conf.publisher) addText(`   Publisher: ${conf.publisher}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Books
      if (faculty.books.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Books/Chapters", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.books.forEach((book, idx) => {
          checkPageBreak(10);
          addText(`${idx + 1}. ${book.title}`);
          if (book.bookTitle) addText(`   Book: ${book.bookTitle}`);
          addText(`   Publisher: ${book.publisher || "N/A"}, Year: ${book.year}`);
          if (book.isbn) addText(`   ISBN: ${book.isbn}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Patents
      if (faculty.patents.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Patents", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.patents.forEach((patent, idx) => {
          checkPageBreak(10);
          addText(`${idx + 1}. ${patent.patentTitle}`);
          addText(`   Status: ${patent.status}, Country: ${patent.country}, Year: ${patent.year}`);
          if (patent.patentNumber) addText(`   Patent No: ${patent.patentNumber}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // NPTEL Courses
      if (faculty.nptelCourses.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("NPTEL Courses", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.nptelCourses.forEach((course, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${course.courseName}`);
          addText(`   Duration: ${course.duration}, Year: ${course.completionYear}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Awards
      if (faculty.awards.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Awards & Recognition", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.awards.forEach((award, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${award.awardName}`);
          addText(`   By: ${award.awardingBody}, Year: ${award.year}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Funding Research
      if (faculty.fundingResearch.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Research Funding", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.fundingResearch.forEach((funding, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${funding.proposalTitle}`);
          addText(`   Agency: ${funding.agencyName}, Amount: Rs.${funding.amount}, Year: ${funding.yearReceived}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // PhD Guided
      if (faculty.phdGuided.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("PhD Students Guided", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.phdGuided.forEach((phd, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${phd.candidateName}`);
          addText(`   University: ${phd.university}, Year: ${phd.researchYear}, Status: ${phd.status}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Consulting
      if (faculty.consulting.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Consulting Projects", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.consulting.forEach((cons, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${cons.projectTitle}`);
          addText(`   Company: ${cons.companyName}, Amount: Rs.${cons.amount}, Year: ${cons.year}`);
          addText(`   Status: ${cons.status}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // MoUs
      if (faculty.mous.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("MoUs/Collaborations", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.mous.forEach((mou, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${mou.companyName}`);
          addText(`   Purpose: ${mou.purpose}, Duration: ${mou.duration}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Seminars/Workshops
      if (faculty.seminars.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Seminars/Workshops", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.seminars.forEach((sem, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${sem.eventName} - ${sem.title}`);
          if (sem.fundingAgency) addText(`   Funding: ${sem.fundingAgency}, Amount: Rs.${sem.amount}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Invited Tasks
      if (faculty.invitedTasks.length > 0) {
        checkPageBreak(15);
        doc.setFontSize(13);
        doc.text("Invited Talks/Tasks", margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        
        faculty.invitedTasks.forEach((task, idx) => {
          checkPageBreak(8);
          addText(`${idx + 1}. ${task.title}`);
          addText(`   At: ${task.invitedAt}, Date: ${new Date(task.date).toLocaleDateString()}`);
          yPos += 3;
        });
        yPos += 3;
      }

      // Separator between faculties (only if multiple faculties)
      if (faculties.length > 1) {
        checkPageBreak(10);
        doc.setDrawColor(200);
        doc.line(margin, yPos, margin + maxWidth, yPos);
        yPos += 10;
      }
    });

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    
    const filename = faculties.length === 1
      ? `faculty_${faculties[0].name.replace(/\s+/g, '_')}_report.pdf`
      : "complete_faculty_report.pdf";

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ 
      error: "Failed to generate PDF", 
      details: error.message 
    }, { status: 500 });
  }
}