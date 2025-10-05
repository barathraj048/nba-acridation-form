import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ id: string }>;
}

// GET all seminars for a faculty
export async function GET(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;

  const seminars = await prisma.seminarWorkshop.findMany({
    where: { facultyId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: seminars });
}

// CREATE a new seminar
export async function POST(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;
  const body = await req.json();

  if (!facultyId || !body.eventName || !body.title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newSeminar = await prisma.seminarWorkshop.create({
    data: {
      eventName: body.eventName,
      title: body.title,
      fundingAgency: body.fundingAgency || null,
      amount: body.amountReceived ?? null, // map body field to Prisma model
      facultyId,
    },
  });

  return NextResponse.json(newSeminar, { status: 201 });
}

// UPDATE a seminar
export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const updated = await prisma.seminarWorkshop.update({
    where: { id: body.id },
    data: {
      eventName: body.eventName,
      title: body.title,
      fundingAgency: body.fundingAgency || null,
      amount: body.amountReceived ?? null,
    },
  });

  return NextResponse.json(updated);
}

// DELETE a seminar
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.seminarWorkshop.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
