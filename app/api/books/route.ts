import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.book.findMany({
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

  return NextResponse.json({ books });
}
