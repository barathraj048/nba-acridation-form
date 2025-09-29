import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// CREATE a new patent under a faculty
export async function POST(req: Request, { params }: Params) {
  try {
    const data = await req.json();

    if (!params.id) {
      throw new Error("facultyId missing in URL");
    }

    const patent = await prisma.patent.create({
      data: {
        ...data,
        facultyId: params.id, // link patent to faculty
      },
    });

    return NextResponse.json(patent);
  } catch (error: any) {
    console.error("POST /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all patents for a faculty
export async function GET(_: Request, { params }: Params) {
  try {
    if (!params.id) {
      throw new Error("facultyId missing in URL");
    }

    const patents = await prisma.patent.findMany({
      where: { facultyId: params.id },
      orderBy: { year: "desc" }, // optional: sort by year
    });

    return NextResponse.json(patents);
  } catch (error: any) {
    console.error("GET /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a patent
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id, ...updates } = await req.json();

    if (!params.id) {
      throw new Error("facultyId missing in URL");
    }

    const patent = await prisma.patent.update({
      where: { id },
      data: {
        ...updates,
        facultyId: params.id, // keep the link consistent
      },
    });

    return NextResponse.json(patent);
  } catch (error: any) {
    console.error("PUT /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a patent
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.patent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
