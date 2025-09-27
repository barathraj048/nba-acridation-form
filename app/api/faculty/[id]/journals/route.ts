import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ Await params.id
  const { searchParams } = new URL(req.url);
  const yearGte = searchParams.get("year_gte");

  const where: any = { facultyId: id };
  if (yearGte) where.year = { gte: Number(yearGte) };

  const data = await prisma.journal.findMany({
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
    // bulk insert
    await prisma.journal.createMany({
      data: body.map((row) => ({ ...row, facultyId: id })),
      skipDuplicates: true,
    });
  } else {
    await prisma.journal.create({
      data: { ...body, facultyId: id },
    });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params; // still await it to consume
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.journal.update({
    where: { id: body.id },
    data: body,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params; // not used but must await
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.journal.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
