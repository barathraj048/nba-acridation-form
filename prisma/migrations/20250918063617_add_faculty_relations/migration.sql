-- CreateEnum
CREATE TYPE "Department" AS ENUM ('CSE', 'ECE', 'IT', 'AIDS', 'MECH', 'EEE');

-- CreateEnum
CREATE TYPE "PatentStatus" AS ENUM ('PUBLISHED', 'GRANTED');

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "joiningYear" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleScholar" TEXT,
    "scopusUrl" TEXT,
    "webOfScience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "paperTitle" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "doi" TEXT,
    "issn" TEXT,
    "indexedIn" TEXT,
    "impactFactor" DOUBLE PRECISION,
    "year" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL,
    "paperSno" TEXT NOT NULL,
    "authorDetails" TEXT NOT NULL,
    "paperTitle" TEXT NOT NULL,
    "conferenceName" TEXT NOT NULL,
    "publisher" TEXT,
    "doiOrUrl" TEXT,
    "indexedIn" TEXT,
    "year" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bookTitle" TEXT,
    "isbn" TEXT,
    "publisher" TEXT,
    "year" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patent" (
    "id" TEXT NOT NULL,
    "patentTitle" TEXT NOT NULL,
    "patentNumber" TEXT,
    "authors" TEXT NOT NULL,
    "status" "PatentStatus" NOT NULL,
    "country" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "link" TEXT,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NPTELCourse" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "instructorName" TEXT NOT NULL,
    "platformLink" TEXT,
    "completionYear" INTEGER NOT NULL,
    "certificateUrl" TEXT,
    "duration" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NPTELCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" TEXT NOT NULL,
    "awardName" TEXT NOT NULL,
    "awardingBody" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "details" TEXT,
    "link" TEXT,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingResearch" (
    "id" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL,
    "proposalTitle" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "yearReceived" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingResearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhDGuided" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "researchYear" INTEGER NOT NULL,
    "university" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhDGuided_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultingDetail" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoU" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeminarWorkshop" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fundingAgency" TEXT,
    "amount" DOUBLE PRECISION,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeminarWorkshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitedTask" (
    "id" TEXT NOT NULL,
    "facultyName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "invitedAt" TIMESTAMP(3) NOT NULL,
    "facultyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvitedTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE INDEX "Faculty_department_idx" ON "Faculty"("department");

-- CreateIndex
CREATE INDEX "Faculty_joiningYear_idx" ON "Faculty"("joiningYear");

-- CreateIndex
CREATE INDEX "Faculty_name_idx" ON "Faculty"("name");

-- CreateIndex
CREATE INDEX "Journal_year_idx" ON "Journal"("year");

-- CreateIndex
CREATE INDEX "Journal_facultyId_idx" ON "Journal"("facultyId");

-- CreateIndex
CREATE INDEX "Conference_year_idx" ON "Conference"("year");

-- CreateIndex
CREATE INDEX "Conference_facultyId_idx" ON "Conference"("facultyId");

-- CreateIndex
CREATE INDEX "Book_year_idx" ON "Book"("year");

-- CreateIndex
CREATE INDEX "Book_facultyId_idx" ON "Book"("facultyId");

-- CreateIndex
CREATE INDEX "Patent_status_idx" ON "Patent"("status");

-- CreateIndex
CREATE INDEX "Patent_year_idx" ON "Patent"("year");

-- CreateIndex
CREATE INDEX "Patent_facultyId_idx" ON "Patent"("facultyId");

-- CreateIndex
CREATE INDEX "NPTELCourse_completionYear_idx" ON "NPTELCourse"("completionYear");

-- CreateIndex
CREATE INDEX "NPTELCourse_facultyId_idx" ON "NPTELCourse"("facultyId");

-- CreateIndex
CREATE INDEX "Award_year_idx" ON "Award"("year");

-- CreateIndex
CREATE INDEX "Award_facultyId_idx" ON "Award"("facultyId");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patent" ADD CONSTRAINT "Patent_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NPTELCourse" ADD CONSTRAINT "NPTELCourse_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingResearch" ADD CONSTRAINT "FundingResearch_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhDGuided" ADD CONSTRAINT "PhDGuided_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultingDetail" ADD CONSTRAINT "ConsultingDetail_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoU" ADD CONSTRAINT "MoU_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeminarWorkshop" ADD CONSTRAINT "SeminarWorkshop_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitedTask" ADD CONSTRAINT "InvitedTask_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
