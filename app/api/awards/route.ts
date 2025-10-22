import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const data = await prisma.award.findMany({
      orderBy: { year: "desc" },
      include: {
        faculty: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching awards:", error);
    return NextResponse.json(
      { error: "Failed to fetch awards" },
      { status: 500 }
    );
  }
};
