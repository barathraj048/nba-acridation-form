import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ facultyId: string }> }
) {
  try {
    const { facultyId } = await params;
    const data = await prisma.fundingResearch.findMany({ where: { facultyId } });
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("GET /fundingResearch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ facultyId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { facultyId } = resolvedParams;
    
    console.log("Resolved params:", resolvedParams);
    console.log("Faculty ID:", facultyId);
    
    if (!facultyId) {
      return NextResponse.json(
        { error: "facultyId is required in URL params" }, 
        { status: 400 }
      );
    }
    
    const body = await req.json();
    console.log("Request body:", body);
    
    // Map amountReceived to amount and remove temporary id
    const { id: tempId, amountReceived, ...rest } = body;
    
    const newItem = await prisma.fundingResearch.create({
      data: { 
        ...rest, 
        amount: amountReceived,
        facultyId 
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /fundingResearch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, facultyId, amountReceived, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const dataToUpdate = {
      ...updates,
      ...(amountReceived !== undefined && { amount: amountReceived })
    };

    const updated = await prisma.fundingResearch.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /fundingResearch error:", error);
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

    await prisma.fundingResearch.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /fundingResearch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}