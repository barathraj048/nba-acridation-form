import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{ id: string }>;
}

// GET all MoUs for a faculty
export async function GET(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;

  try {
    const mouList = await prisma.moU.findMany({
      where: { facultyId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: mouList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new MoU
export async function POST(req: NextRequest, context: Context) {
  const { id: facultyId } = await context.params;
  const body = await req.json();

  if (!facultyId || !body.companyName || !body.purpose) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const newMoU = await prisma.moU.create({
      data: {
        companyName: body.companyName,
        purpose: body.purpose,
        duration: body.duration || null,
        facultyId,
      },
    });
    return NextResponse.json(newMoU, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE MoU
export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const updated = await prisma.moU.update({
      where: { id: body.id },
      data: {
        companyName: body.companyName,
        purpose: body.purpose,
        duration: body.duration || null,
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE MoU
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.moU.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
