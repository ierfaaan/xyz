/*
  Warnings:

  - The required column `projectId` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "manifesto" TEXT,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "slogan" TEXT;