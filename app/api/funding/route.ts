import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.fundingResearch.findMany({
    include: { faculty: { select: { name: true, department: true } } },
    orderBy: { yearReceived: "desc" },
  });
  return NextResponse.json({ data });
}
