"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function AwardsPage() {
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/awards")
      .then((res) => res.json())
      .then((data) => setAwards(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">All Awards & Achievements</h1>

      {awards.length ? (
        awards.map((award) => (
          <Card key={award.id}>
            <CardHeader>
              <CardTitle>{award.awardName}</CardTitle>
              <CardDescription>
                {award.awardingBody} • {award.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {award.details && (
                <p className="mb-2">
                  <strong>Details:</strong> {award.details}
                </p>
              )}
              {award.link && (
                <p className="text-blue-600 underline mb-2">
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate / Source
                  </a>
                </p>
              )}
              <p>
                <strong>Faculty:</strong> {award.faculty.name} (
                {award.faculty.department})
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Trophy className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p>No awards found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
