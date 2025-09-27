import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const course = await prisma.nPTELCourse.create({ data });
  return NextResponse.json(course);
}

export async function GET() {
  const courses = await prisma.nPTELCourse.findMany();
  return NextResponse.json(courses);
}

export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const course = await prisma.nPTELCourse.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(course);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.nPTELCourse.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
