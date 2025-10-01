import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const yearGte = searchParams.get("year_gte");

  const where: any = { facultyId: id };
  if (yearGte) where.year = { gte: Number(yearGte) };

  const data = await prisma.award.findMany({
    where,
    orderBy: { year: "desc" },
  });

  return NextResponse.json({ data });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (Array.isArray(body)) {
    await prisma.award.createMany({
      data: body.map((row) => ({ ...row, facultyId: id })),
      skipDuplicates: true,
    });
    return NextResponse.json({ ok: true });
  } else {
    const award = await prisma.award.create({
      data: { ...body, facultyId: id },
    });
    return NextResponse.json(award, { status: 201 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { id: awardId, ...updates } = body;
  const award = await prisma.award.update({
    where: { id: awardId },
    data: updates,
  });

  return NextResponse.json(award);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.award.delete({ where: { id } });
  return NextResponse.json({ success: true });
}