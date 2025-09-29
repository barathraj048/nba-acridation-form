import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const award = await prisma.award.create({ data });
  return NextResponse.json(award);
}

export async function GET() {
  // Default filter → last 4 years
  const fourYearsAgo = new Date().getFullYear() - 4;
  const awards = await prisma.award.findMany({
    where: { year: { gte: fourYearsAgo } },
  });
  return NextResponse.json(awards);
}

export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const award = await prisma.award.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(award);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.award.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
