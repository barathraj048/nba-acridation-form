import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ Await params
    const data = await prisma.consultingDetail.findMany({ 
      where: { facultyId: id } // ✅ Changed to facultyId
    });
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("GET /consultingDetail error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: facultyId } = await params; // ✅ Await params and rename to facultyId
    const body = await req.json();
    
    // ✅ Remove temporary id from body
    const { id: tempId, amountReceived, ...rest } = body;
    
    const newItem = await prisma.consultingDetail.create({
      data: { 
        ...rest, 
        amount: amountReceived,
        facultyId // ✅ Use facultyId, not id
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /consultingDetail error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, facultyId, amountReceived, ...updates } = body; // ✅ Fixed duplicate 'id'
    
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const dataToUpdate = {
      ...updates,
      ...(amountReceived !== undefined && { amount: amountReceived })
    };

    const updated = await prisma.consultingDetail.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /consultingDetail error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.consultingDetail.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /consultingDetail error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}