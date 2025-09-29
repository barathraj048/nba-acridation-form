import TabularCRUD from "@/components/TabularCRUD";

function FacultyProfile({ facultyId }: { facultyId: string }) {
  const currentYear = new Date().getFullYear();
  const fourYearsAgo = currentYear - 4;

  return (
    <div className="space-y-6">
      {/* 1. Journals */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/journals`}
        title="Journals"
        columns={[
          { key: "authorName", label: "Author" },
          { key: "paperTitle", label: "Title" },
          { key: "journalName", label: "Journal" },
          { key: "doi", label: "DOI" },
          { key: "issn", label: "ISSN" },
          { key: "indexedIn", label: "Indexed In" },
          { key: "impactFactor", label: "Impact Factor", type: "number" },
          { key: "year", label: "Year", type: "number" },
        ]}
        csvTemplateKey="journals"
      />

      {/* 2. Conferences */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/conferences`}
        title="Conferences"
        columns={[
          { key: "paperSno", label: "SNo" },
          { key: "authorDetails", label: "Author Details" },
          { key: "paperTitle", label: "Title" },
          { key: "conferenceName", label: "Conference" },
          { key: "publisher", label: "Publisher" },
          { key: "doiOrUrl", label: "DOI/URL" },
          { key: "indexedIn", label: "Indexed In" },
          { key: "year", label: "Year", type: "number" },
        ]}
        csvTemplateKey="conferences"
      />

      {/* 3. Books */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/books`}
        title="Books / Chapters"
        columns={[
          { key: "authorName", label: "Author" },
          { key: "title", label: "Title" },
          { key: "bookTitle", label: "Book Title" },
          { key: "isbn", label: "ISBN" },
          { key: "publisher", label: "Publisher" },
          { key: "year", label: "Year", type: "number" },
        ]}
        csvTemplateKey="books"
      />

      {/* 4. Patents */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/patents`}
        title="Patents"
        columns={[
          { key: "patentTitle", label: "Title" },
          { key: "patentNumber", label: "Patent Number" },
          { key: "authors", label: "Authors" },
          { key: "status", label: "Status" },
          { key: "country", label: "Country" },
          { key: "year", label: "Year", type: "number" },
          { key: "link", label: "Link" },
        ]}
        csvTemplateKey="patents"
      />

      {/* 5. NPTEL */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/nptel-courses`}
        title="NPTEL Courses"
        columns={[
          { key: "courseName", label: "Course" },
          { key: "instructorName", label: "Instructor" },
          { key: "platformLink", label: "Platform Link" },
          { key: "completionYear", label: "Year", type: "number" },
          { key: "certificateUrl", label: "Certificate" },
          { key: "duration", label: "Duration" },
        ]}
        csvTemplateKey="nptel"
      />

      {/* 6. Awards */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/awards`}
        title="Awards & Recognition"
        columns={[
          { key: "awardName", label: "Award" },
          { key: "awardingBody", label: "Awarding Body" },
          { key: "year", label: "Year", type: "number" },
          { key: "detailsLink", label: "Details/Link" },
        ]}
        defaultQuery={{ year_gte: fourYearsAgo }}
        csvTemplateKey="awards"
      />

      {/* 7. Funding Research */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/funding-research`}
        title="Funding Research"
        columns={[
          { key: "agencyName", label: "Funding Agency" },
          { key: "proposalTitle", label: "Proposal Title" },
          { key: "amountReceived", label: "Amount Received", type: "number" },
          { key: "yearReceived", label: "Year", type: "number" },
        ]}
        csvTemplateKey="fundingResearch"
      />

      {/* 8. PhD Guided */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/phd-guided`}
        title="PhD Guided"
        columns={[
          { key: "candidateName", label: "Candidate Name" },
          { key: "researchYear", label: "Year of Research", type: "number" },
          { key: "university", label: "University" },
          { key: "status", label: "Status" },
        ]}
        csvTemplateKey="phdGuided"
      />

      {/* 9. Consulting */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/consulting`}
        title="Consulting Details"
        columns={[
          { key: "companyName", label: "Company" },
          { key: "projectTitle", label: "Project Title" },
          { key: "amountReceived", label: "Amount Received", type: "number" },
          { key: "year", label: "Year", type: "number" },
          { key: "status", label: "Status" },
        ]}
        csvTemplateKey="consulting"
      />

      {/* 10. MoU Signed */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/mou`}
        title="MoU Signed with Industry"
        columns={[
          { key: "companyName", label: "Company" },
          { key: "purpose", label: "Purpose" },
          { key: "duration", label: "Duration" },
        ]}
        csvTemplateKey="mou"
      />

      {/* 11. Seminar / Workshop */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/seminars`}
        title="Seminars / Workshops"
        columns={[
          { key: "eventName", label: "Event Name" },
          { key: "title", label: "Title" },
          { key: "fundingAgency", label: "Funding Agency" },
          { key: "amountReceived", label: "Amount Received", type: "number" },
        ]}
        csvTemplateKey="seminars"
      />

      {/* 12. Invited Tasks */}
      <TabularCRUD
        facultyId={facultyId}
        apiBase={`/api/faculty/${facultyId}/invited-tasks`}
        title="Invited Tasks"
        columns={[
          { key: "facultyName", label: "Faculty" },
          { key: "title", label: "Title" },
          { key: "invitedAt", label: "Invited At" },
          { key: "date", label: "Date" },
        ]}
        csvTemplateKey="invitedTasks"
      />
    </div>
  );
}

export default FacultyProfile;
