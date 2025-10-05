import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const patents = await prisma.patent.findMany({
    include: {
      faculty: {
        select: {
          name: true,
          department: true,
        },
      },
    },
    orderBy: { year: "desc" },
  });

  return NextResponse.json({ patents });
}
