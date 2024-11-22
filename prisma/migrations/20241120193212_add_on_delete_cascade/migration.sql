/*
  Warnings:

  - The values [PROJECt] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('TEAM', 'PROJECT');
ALTER TABLE "Role" ALTER COLUMN "type" TYPE "RoleType_new" USING ("type"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "RoleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_projectMembershipId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembership" DROP CONSTRAINT "TeamMembership_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRole" DROP CONSTRAINT "TeamRole_teamMembershipId_fkey";

-- CreateTable
CREATE TABLE "_TeamToTeamRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTeamRole_AB_unique" ON "_TeamToTeamRole"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTeamRole_B_index" ON "_TeamToTeamRole"("B");

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_projectMembershipId_fkey" FOREIGN KEY ("projectMembershipId") REFERENCES "ProjectMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRole" ADD CONSTRAINT "TeamRole_teamMembershipId_fkey" FOREIGN KEY ("teamMembershipId") REFERENCES "TeamMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTeamRole" ADD CONSTRAINT "_TeamToTeamRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTeamRole" ADD CONSTRAINT "_TeamToTeamRole_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
