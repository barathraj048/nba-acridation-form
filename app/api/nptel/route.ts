import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.nPTELCourse.findMany({
    include: {
      faculty: {
        select: {
          name: true,
          department: true,
        },
      },
    },
    orderBy: { completionYear: "desc" },
  });

  return NextResponse.json({ courses });
}
