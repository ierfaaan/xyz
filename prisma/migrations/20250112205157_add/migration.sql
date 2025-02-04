-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_directoryId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "directoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
