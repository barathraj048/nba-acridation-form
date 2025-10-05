"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function PhDPage() {
  const [phds, setPhds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/phd")
      .then(res => res.json())
      .then(data => setPhds(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">All PhD Guided</h1>
      {phds.length ? phds.map(p => (
        <Card key={p.id}>
          <CardHeader>
            <CardTitle>{p.candidateName}</CardTitle>
            <CardDescription>{p.university} • {p.researchYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Status:</strong> {p.status}</p>
            <p><strong>Faculty:</strong> {p.faculty.name} ({p.faculty.department})</p>
          </CardContent>
        </Card>
      )) : (
        <Card>
          <CardContent className="text-center py-8">
            <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4"/>
            <p>No PhD records found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
