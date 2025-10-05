import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ id: string }>;
}

// ✅ Get all invited tasks for a faculty
export async function GET(req: NextRequest, context: Context) {
  const { id } = await context.params;
  const data = await prisma.invitedTask.findMany({
    where: { facultyId: id },
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ data });
}

// ✅ Create new invited task
export async function POST(req: NextRequest, context: Context) {
  const { id } = await context.params;
  const body = await req.json();

  if (!id || !body.title || !body.facultyName || !body.invitedAt || !body.date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newItem = await prisma.invitedTask.create({
    data: {
      facultyName: body.facultyName,
      title: body.title,
      invitedAt: body.invitedAt,          // place
      date: new Date(body.date),          // actual date
      facultyId: id,
    },
  });

  return NextResponse.json(newItem, { status: 201 });
}

// ✅ Update invited task
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const updated = await prisma.invitedTask.update({
    where: { id: body.id },
    data: {
      ...body,
      date: new Date(body.date),
    },
  });
  return NextResponse.json(updated);
}

// ✅ Delete invited task
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.invitedTask.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
