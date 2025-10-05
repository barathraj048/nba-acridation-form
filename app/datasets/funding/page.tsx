"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function FundingPage() {
  const [fundings, setFundings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/funding")
      .then(res => res.json())
      .then(data => setFundings(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">All Funding / Research</h1>
      {fundings.length ? fundings.map(f => (
        <Card key={f.id}>
          <CardHeader>
            <CardTitle>{f.proposalTitle}</CardTitle>
            <CardDescription>{f.agencyName} • {f.yearReceived}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Amount:</strong> ₹{f.amount}</p>
            <p><strong>Faculty:</strong> {f.faculty.name} ({f.faculty.department})</p>
          </CardContent>
        </Card>
      )) : (
        <Card>
          <CardContent className="text-center py-8">
            <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4"/>
            <p>No funding records found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
