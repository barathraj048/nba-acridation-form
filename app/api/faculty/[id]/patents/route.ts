import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 👇 Notice: params is now a Promise in Next.js 15
interface Context {
  params: Promise<{ id: string }>;
}

// CREATE a new patent under a faculty
export async function POST(req: Request, context: Context) {
  try {
    const { id } = await context.params; // ✅ await the params
    const data = await req.json();

    if (!id) throw new Error("facultyId missing in URL");

    const patent = await prisma.patent.create({
      data: {
        ...data,
        facultyId: id, // link patent to faculty
      },
    });

    return NextResponse.json(patent);
  } catch (error: any) {
    console.error("POST /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all patents for a faculty
export async function GET(_: Request, context: Context) {
  try {
    const { id } = await context.params; // ✅ await the params

    if (!id) throw new Error("facultyId missing in URL");

    const patents = await prisma.patent.findMany({
      where: { facultyId: id },
      orderBy: { year: "desc" }, // optional: sort by year
    });

    return NextResponse.json(patents);
  } catch (error: any) {
    console.error("GET /patents error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: Context) {
  try {
    const { id } = await context.params; 
    const { id: patentId, ...updates } = await req.json();

    if (!id) throw new Error("facultyId missing in URL");

    const patent = await prisma.patent.update({
      where: { id: patentId },
      data: {
        ...updates,
        facultyId: id, 
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
