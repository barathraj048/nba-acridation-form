import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { facultyId: string } }) {
  const { facultyId } = params;
  const data = await prisma.fundingResearch.findMany({ where: { facultyId } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest, { params }: { params: { facultyId: string } }) {
  const { facultyId } = params;
  const body = await req.json();
  const newItem = await prisma.fundingResearch.create({
    data: { ...body, facultyId },
  });
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const updated = await prisma.fundingResearch.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  await prisma.fundingResearch.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
