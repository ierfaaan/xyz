/*
  Warnings:

  - You are about to drop the `ProjectRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamToTeamRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_projectMembershipId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRole" DROP CONSTRAINT "TeamRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRole" DROP CONSTRAINT "TeamRole_teamMembershipId_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToTeamRole" DROP CONSTRAINT "_TeamToTeamRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToTeamRole" DROP CONSTRAINT "_TeamToTeamRole_B_fkey";

-- AlterTable
ALTER TABLE "ProjectMembership" ADD COLUMN     "accessList" TEXT[],
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'member';

-- AlterTable
ALTER TABLE "TeamMembership" ADD COLUMN     "accessList" TEXT[],
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'member';

-- DropTable
DROP TABLE "ProjectRole";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "TeamRole";

-- DropTable
DROP TABLE "_TeamToTeamRole";

-- DropEnum
DROP TYPE "RoleType";

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
