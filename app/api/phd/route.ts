import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.phDGuided.findMany({
    include: { faculty: { select: { name: true, department: true } } },
    orderBy: { researchYear: "desc" },
  });
  return NextResponse.json({ data });
}
