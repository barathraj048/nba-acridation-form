import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { facultySchema } from "@/lib/validations";
import { Department } from "@prisma/client";

// =============== GET (with filters + pagination) ==================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") as Department;
    const joiningYearMin = searchParams.get("joiningYearMin");
    const joiningYearMax = searchParams.get("joiningYearMax");
    const qualification = searchParams.get("qualification") || "";
    const hasGoogleScholar = searchParams.get("hasGoogleScholar") === "true";
    const hasScopus = searchParams.get("hasScopus") === "true";
    const hasWebOfScience = searchParams.get("hasWebOfScience") === "true";
    const hasPatents = searchParams.get("hasPatents") === "true";
    const hasNptel = searchParams.get("hasNptel") === "true";

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (department) {
      where.department = department;
    }
    if (joiningYearMin || joiningYearMax) {
      where.joiningYear = {};
      if (joiningYearMin) where.joiningYear.gte = parseInt(joiningYearMin);
      if (joiningYearMax) where.joiningYear.lte = parseInt(joiningYearMax);
    }
    if (qualification) {
      where.qualification = { contains: qualification, mode: "insensitive" };
    }
    if (hasGoogleScholar) {
      where.googleScholar = { not: null };
    }
    if (hasScopus) {
      where.scopusUrl = { not: null };
    }
    if (hasWebOfScience) {
      where.webOfScience = { not: null };
    }
    if (hasPatents) {
      where.patents = { some: {} };
    }
    if (hasNptel) {
      where.nptelCourses = { some: {} };
    }

    const include: any = {
      _count: {
        select: {
          journals: true,
          conferences: true,
          books: true,
          patents: true,
          nptelCourses: true,
          awards: true,
        },
      },
    };

    const [faculty, total] = await Promise.all([
      prisma.faculty.findMany({
        where,
        include,
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.faculty.count({ where }),
    ]);

    return NextResponse.json({
      data: faculty,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}

// =============== POST (create new faculty) ==================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = facultySchema.parse(body);

    const faculty = await prisma.faculty.create({
      data: {
        ...validatedData,
        googleScholar: validatedData.googleScholar || null,
        scopusUrl: validatedData.scopusUrl || null,
        webOfScience: validatedData.webOfScience || null,
      },
    });

    return NextResponse.json(faculty, { status: 201 });
  } catch (error: any) {
    console.error("Error creating faculty:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create faculty" },
      { status: 500 }
    );
  }
}

// =============== PUT (update faculty) ==================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const validatedData = facultySchema.parse(body);

    const faculty = await prisma.faculty.update({
      where: { id: body.id },
      data: {
        ...validatedData,
        googleScholar: validatedData.googleScholar || null,
        scopusUrl: validatedData.scopusUrl || null,
        webOfScience: validatedData.webOfScience || null,
      },
    });

    return NextResponse.json(faculty);
  } catch (error: any) {
    console.error("Error updating faculty:", error);
    return NextResponse.json(
      { error: "Failed to update faculty" },
      { status: 500 }
    );
  }
}

// =============== DELETE (remove faculty) ==================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.faculty.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    return NextResponse.json(
      { error: "Failed to delete faculty" },
      { status: 500 }
    );
  }
}
