import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ id: string }>;
}

// ✅ Get all PhDs guided by a faculty
export async function GET(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;

  try {
    const data = await prisma.phDGuided.findMany({
      where: { facultyId },
      orderBy: { researchYear: "desc" },
    });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Create a new PhD guided
export async function POST(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;
  const body = await req.json();

  if (!facultyId || !body.candidateName || !body.researchYear || !body.university) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const newItem = await prisma.phDGuided.create({
      data: {
        candidateName: body.candidateName,
        researchYear: body.researchYear,
        university: body.university,
        status: body.status || null,
        facultyId,
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update PhD guided
export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const updated = await prisma.phDGuided.update({
      where: { id: body.id },
      data: {
        candidateName: body.candidateName,
        researchYear: body.researchYear,
        university: body.university,
        status: body.status || null,
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete PhD guided
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.phDGuided.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
