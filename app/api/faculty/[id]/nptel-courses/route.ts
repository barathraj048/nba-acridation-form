import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ id: string }>;
}

// ✅ Get all NPTEL courses for a faculty
export async function GET(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;
  const courses = await prisma.nPTELCourse.findMany({
    where: { facultyId },
    orderBy: { completionYear: "desc" },
  });
  return NextResponse.json({ data: courses });
}

// ✅ Create a new NPTEL course
export async function POST(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;
  const body = await req.json();

  if (!facultyId || !body.courseName || !body.instructorName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newCourse = await prisma.nPTELCourse.create({
    data: {
      courseName: body.courseName,
      instructorName: body.instructorName,
      platformLink: body.platformLink || null,
      completionYear: body.completionYear,
      certificateUrl: body.certificateUrl || null,
      duration: body.duration || null,
      facultyId, // ✅ link to faculty
    },
  });

  return NextResponse.json(newCourse, { status: 201 });
}

// ✅ Update an NPTEL course
export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { id, ...updates } = body;
  const updated = await prisma.nPTELCourse.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json(updated);
}

// ✅ Delete an NPTEL course
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.nPTELCourse.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
