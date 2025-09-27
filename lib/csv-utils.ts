import Papa from 'papaparse';

export interface CSVExportOptions {
  filename: string;
  data: any[];
  headers?: string[];
}

export function exportToCSV({ filename, data, headers }: CSVExportOptions) {
  const csv = Papa.unparse(data, {
    headers: headers || (data.length > 0 ? Object.keys(data[0]) : []),
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export interface CSVImportOptions {
  file: File;
  onComplete: (results: Papa.ParseResult<any>) => void;
  onError?: (error: Error) => void;
}

export function importFromCSV({ file, onComplete, onError }: CSVImportOptions) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    complete: onComplete,
    error: onError || ((error) => console.error('CSV parsing error:', error)),
  });
}

// CSV template generators for each entity type
export const csvTemplates = {
  faculty: [
    {
      name: 'John Doe',
      department: 'CSE',
      joiningYear: 2020,
      qualification: 'Ph.D. Computer Science',
      phone: '+91-9876543210',
      email: 'john.doe@university.edu',
      googleScholar: 'https://scholar.google.com/citations?user=example',
      scopusUrl: 'https://www.scopus.com/authid/detail.uri?authorId=example',
      webOfScience: 'https://www.webofscience.com/wos/author/rid/example',
    },
  ],
  journals: [
    {
      authorName: 'John Doe',
      paperTitle: 'Advanced Machine Learning Techniques',
      journalName: 'IEEE Transactions on Pattern Analysis',
      doi: '10.1109/TPAMI.2023.example',
      issn: '0162-8828',
      indexedIn: 'SCI, Scopus',
      impactFactor: 17.861,
      year: 2023,
    },
  ],
  conferences: [
    {
      paperSno: 'C001',
      authorDetails: 'John Doe, Jane Smith',
      paperTitle: 'Novel Approach to Deep Learning',
      conferenceName: 'ICML 2023',
      publisher: 'ACM',
      doiOrUrl: 'https://doi.org/10.1145/example',
      indexedIn: 'Scopus, DBLP',
      year: 2023,
    },
  ],
  books: [
    {
      authorName: 'John Doe',
      title: 'Introduction to Machine Learning',
      bookTitle: 'AI and ML Handbook',
      isbn: '978-0123456789',
      publisher: 'Academic Press',
      year: 2023,
    },
  ],
  patents: [
    {
      patentTitle: 'Innovative ML Algorithm',
      patentNumber: 'US123456789',
      authors: 'John Doe, Jane Smith',
      status: 'GRANTED',
      country: 'United States',
      year: 2023,
      link: 'https://patents.google.com/patent/US123456789',
    },
  ],
  nptel: [
    {
      courseName: 'Machine Learning Foundations',
      instructorName: 'Prof. Andrew Ng',
      platformLink: 'https://onlinecourses.nptel.ac.in/example',
      completionYear: 2023,
      certificateUrl: 'https://nptel.ac.in/certificates/example',
      duration: '12 weeks',
    },
  ],
  awards: [
    {
      awardName: 'Best Paper Award',
      awardingBody: 'IEEE Computer Society',
      year: 2023,
      details: 'Outstanding contribution to machine learning research',
      link: 'https://www.computer.org/awards/example',
    },
  ],
  fundingResearch: [
    {
      agencyName: 'DST',
      proposalTitle: 'AI for Healthcare',
      amountReceived: 500000,
      yearReceived: 2023,
    },
  ],
  phdGuided: [
    {
      candidateName: 'Jane Smith',
      researchYear: 2022,
      university: 'ABC University',
      status: 'Completed',
    },
  ],
  consulting: [
    {
      companyName: 'TechCorp Pvt Ltd',
      projectTitle: 'AI-based Analytics',
      amountReceived: 200000,
      year: 2023,
      status: 'Ongoing',
    },
  ],
  mou: [
    {
      companyName: 'XYZ Industries',
      purpose: 'Research Collaboration',
      duration: '3 years',
    },
  ],
  seminars: [
    {
      eventName: 'Deep Learning Workshop',
      title: 'Advanced Neural Networks',
      fundingAgency: 'AICTE',
      amountReceived: 100000,
    },
  ],
  invitedTasks: [
    {
      facultyName: 'Dr. John Doe',
      title: 'Keynote Speaker on AI',
      invitedAt: 'IIT Delhi',
      date: '2023-07-15',
    },
  ],
};

// ✅ Now you can type csvTemplateKey like this:
export type CsvTemplateKey = keyof typeof csvTemplates;