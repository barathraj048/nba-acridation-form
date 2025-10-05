"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface Journal {
  id: string;
  paperTitle: string;
  journalName: string;
  authorName: string;
  year: number;
  impactFactor?: number;
  doi?: string;
  issn?: string;
  indexedIn?: string;
  faculty?: {
    name: string;
    department: string;
  };
}

export default function AllJournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await fetch("/api/journals");
        const data = await res.json();
        setJournals(data.journals || []);
      } catch (error) {
        console.error("Failed to load journals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 mt-10">Loading journals...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        All Faculty Journal Publications
      </h1>

      {journals.length > 0 ? (
        journals.map((journal) => (
          <Card key={journal.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-lg">{journal.paperTitle}</CardTitle>
              <CardDescription>
                <strong>{journal.journalName}</strong> ({journal.year})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Author:</strong> {journal.authorName}</p>
                  {journal.faculty && (
                    <p>
                      <strong>Faculty:</strong> {journal.faculty.name} ({journal.faculty.department})
                    </p>
                  )}
                  {journal.impactFactor && (
                    <p><strong>Impact Factor:</strong> {journal.impactFactor}</p>
                  )}
                </div>
                <div>
                  {journal.doi && (
                    <p>
                      <strong>DOI:</strong>{" "}
                      <a
                        href={journal.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        {journal.doi}
                      </a>
                    </p>
                  )}
                  {journal.issn && <p><strong>ISSN:</strong> {journal.issn}</p>}
                  {journal.indexedIn && <p><strong>Indexed In:</strong> {journal.indexedIn}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No journal publications found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
