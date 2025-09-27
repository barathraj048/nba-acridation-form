import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE
export async function POST(req: Request) {
  const data = await req.json();
  const conference = await prisma.conference.create({ data });
  return NextResponse.json(conference);
}

// READ (all)
export async function GET() {
  const conferences = await prisma.conference.findMany();
  return NextResponse.json(conferences);
}

// UPDATE
export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const conference = await prisma.conference.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(conference);
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.conference.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
