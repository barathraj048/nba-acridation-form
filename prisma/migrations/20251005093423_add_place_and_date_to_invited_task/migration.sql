/*
  Warnings:

  - Added the required column `date` to the `InvitedTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvitedTask" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "invitedAt" SET DATA TYPE TEXT;
