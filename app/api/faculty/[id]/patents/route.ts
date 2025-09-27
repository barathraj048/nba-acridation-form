import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const patent = await prisma.patent.create({ data });
  return NextResponse.json(patent);
}

export async function GET() {
  const patents = await prisma.patent.findMany();
  return NextResponse.json(patents);
}

export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const patent = await prisma.patent.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(patent);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.patent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
