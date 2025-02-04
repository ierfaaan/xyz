/*
  Warnings:

  - Added the required column `teamId` to the `TeamRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamRole" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamRole" ADD CONSTRAINT "TeamRole_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
