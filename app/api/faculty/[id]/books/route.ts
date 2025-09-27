import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const book = await prisma.book.create({ data });
  return NextResponse.json(book);
}

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const book = await prisma.book.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(book);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.book.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
