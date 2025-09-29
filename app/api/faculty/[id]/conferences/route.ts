import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// CREATE a new conference under a faculty
export async function POST(req: Request, { params }: Params) {
  try {
    if (!params.id) throw new Error("id missing in URL");

    const data = await req.json();
    const conference = await prisma.conference.create({
      data: {
        ...data,
        facultyId: params.id,
      },
    });

    return NextResponse.json(conference);
  } catch (error: any) {
    console.error("POST /conferences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all conferences for a faculty
export async function GET(_: Request, { params }: Params) {
  try {
    if (!params.id) throw new Error("id missing in URL");

    const conferences = await prisma.conference.findMany({
      where: { id: params.id },
      orderBy: { year: "desc" }, // optional: sort by year
    });

    return NextResponse.json(conferences);
  } catch (error: any) {
    console.error("GET /conferences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a conference
export async function PUT(req: Request, { params }: Params) {
  try {
    if (!params.id) throw new Error("id missing in URL");

    const { id, ...updates } = await req.json();
    const conference = await prisma.conference.update({
      where: { id },
      data: {
        ...updates,
        id: params.id,
      },
    });

    return NextResponse.json(conference);
  } catch (error: any) {
    console.error("PUT /conferences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a conference
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.conference.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /conferences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
