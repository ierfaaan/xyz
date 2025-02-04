/*
  Warnings:

  - You are about to drop the column `directoryId` on the `Team` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_directoryId_fkey";

-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "directoryId";

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
