import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FacultyForm } from '@/components/faculty/faculty-form';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';

async function getFaculty(id: string) {
  const faculty = await prisma.faculty.findUnique({
    where: { id },
  });

  if (!faculty) {
    notFound();
  }

  return faculty;
}

export default async function EditFacultyPage({
  params,
}: {
  params: { id: string };
}) {
    const { id } = await params;   // ✅ Await params
  const faculty = await getFaculty(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/faculty/${faculty.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </Button>
      </div>
      
      <FacultyForm 
        initialData={{
          ...faculty,
          googleScholar: faculty.googleScholar || '',
          scopusUrl: faculty.scopusUrl || '',
          webOfScience: faculty.webOfScience || '',
        }}
        isEditing={true}
      />
    </div>
  );
}