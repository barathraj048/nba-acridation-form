import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { facultySchema } from '@/lib/validations';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: params.id },
      include: {
        journals: {
          orderBy: { year: 'desc' },
        },
        conferences: {
          orderBy: { year: 'desc' },
        },
        books: {
          orderBy: { year: 'desc' },
        },
        patents: {
          orderBy: { year: 'desc' },
        },
        nptelCourses: {
          orderBy: { completionYear: 'desc'},
        },
        awards: {
          orderBy: { year: 'desc'},
        },
        _count: {
          select: {
            journals: true,
            conferences: true,
            books: true,
            patents: true,
            nptelCourses: true,
            awards: true,
          },
        },
      },
    });

    if (!faculty) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = facultySchema.parse(body);

    const faculty = await prisma.faculty.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        googleScholar: validatedData.googleScholar || null,
        scopusUrl: validatedData.scopusUrl || null,
        webOfScience: validatedData.webOfScience || null,
      },
    });

    return NextResponse.json(faculty);
  } catch (error: any) {
    console.error('Error updating faculty:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update faculty' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.faculty.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting faculty:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    );
  }
}