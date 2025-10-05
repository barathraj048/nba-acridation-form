"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface Patent {
  id: string;
  patentTitle: string;
  authors: string;
  country: string;
  year: number;
  status: string;
  patentNumber?: string;
  link?: string;
  faculty?: {
    name: string;
    department: string;
  };
}

export default function AllPatentsPage() {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const res = await fetch("/api/patents");
        const data = await res.json();
        setPatents(data.patents || []);
      } catch (error) {
        console.error("Failed to load patents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatents();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 mt-10">Loading patents...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        All Faculty Patents
      </h1>

      {patents.length > 0 ? (
        patents.map((patent) => (
          <Card key={patent.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-lg">{patent.patentTitle}</CardTitle>
              <CardDescription>
                <span className="mr-2">
                  <strong>{patent.status}</strong>
                </span>
                {patent.country} • {patent.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Authors:</strong> {patent.authors}</p>
                  {patent.faculty && (
                    <p>
                      <strong>Faculty:</strong> {patent.faculty.name} ({patent.faculty.department})
                    </p>
                  )}
                  <p><strong>Country:</strong> {patent.country}</p>
                  <p><strong>Year:</strong> {patent.year}</p>
                </div>
                <div>
                  {patent.patentNumber && <p><strong>Patent Number:</strong> {patent.patentNumber}</p>}
                  {patent.link && (
                    <p>
                      <strong>Link:</strong>{" "}
                      <a
                        href={patent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        View Patent
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Lightbulb className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No patents found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
