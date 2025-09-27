import { FacultyForm } from '@/components/faculty/faculty-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewFacultyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/faculty">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Faculty
          </Link>
        </Button>
      </div>
      
      <FacultyForm />
    </div>
  );
}