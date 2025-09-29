import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a new book for a specific faculty
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const book = await prisma.book.create({
    data: {
      ...data,
      facultyId: params.id, // 👈 link to faculty
    },
  });

  return NextResponse.json(book);
}

// Get all books for a specific faculty
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const books = await prisma.book.findMany({
    where: { facultyId: params.id },
    orderBy: { year: "desc" },
  });
  return NextResponse.json(books);
}

// Update a book
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id, ...updates } = await req.json();

  const book = await prisma.book.update({
    where: { id },
    data: {
      ...updates,
      facultyId: params.id, // keep it consistent
    },
  });

  return NextResponse.json(book);
}

// Delete a book
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await req.json();

  await prisma.book.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
