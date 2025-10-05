import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ facultyId: string }>;
}

// GET all funding research for a faculty
export async function GET(req: NextRequest, context: Context) {
  const { facultyId } = await context.params;
  if (!facultyId) {
    return NextResponse.json({ error: "facultyId is required in URL" }, { status: 400 });
  }

  const data = await prisma.fundingResearch.findMany({ where: { facultyId } });
  return NextResponse.json({ data });
}

// POST new funding research
export async function POST(req: NextRequest, context: Context) {
  const { facultyId } = await context.params;
  if (!facultyId) {
    return NextResponse.json({ error: "facultyId is required in URL" }, { status: 400 });
  }

  const body = await req.json();
  // Map front-end field `amountReceived` to DB `amount`
  const { id: tempId, amountReceived, ...rest } = body;

  const newItem = await prisma.fundingResearch.create({
    data: {
      ...rest,
      amount: amountReceived,
      facultyId,
    },
  });

  return NextResponse.json(newItem, { status: 201 });
}

// PUT update a funding research
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, amountReceived, ...updates } = body;

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const updated = await prisma.fundingResearch.update({
    where: { id },
    data: {
      ...updates,
      ...(amountReceived !== undefined && { amount: amountReceived }),
    },
  });

  return NextResponse.json(updated);
}

// DELETE a funding research
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  await prisma.fundingResearch.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
