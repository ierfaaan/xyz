/*
  Warnings:

  - You are about to drop the `Directory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectMembershipRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectRoleActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectRoleHierarchy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMembershipRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamRoleActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamRoleHierarchy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Directory" DROP CONSTRAINT "Directory_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_teamId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembershipRole" DROP CONSTRAINT "ProjectMembershipRole_projectMembershipId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembershipRole" DROP CONSTRAINT "ProjectMembershipRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRoleActions" DROP CONSTRAINT "ProjectRoleActions_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRoleActions" DROP CONSTRAINT "ProjectRoleActions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRoleHierarchy" DROP CONSTRAINT "ProjectRoleHierarchy_childId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRoleHierarchy" DROP CONSTRAINT "ProjectRoleHierarchy_parentId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembership" DROP CONSTRAINT "TeamMembership_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembership" DROP CONSTRAINT "TeamMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembershipRole" DROP CONSTRAINT "TeamMembershipRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembershipRole" DROP CONSTRAINT "TeamMembershipRole_teamMembershipId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRole" DROP CONSTRAINT "TeamRole_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoleActions" DROP CONSTRAINT "TeamRoleActions_actionId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoleActions" DROP CONSTRAINT "TeamRoleActions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoleHierarchy" DROP CONSTRAINT "TeamRoleHierarchy_childId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoleHierarchy" DROP CONSTRAINT "TeamRoleHierarchy_parentId_fkey";

-- DropTable
DROP TABLE "Directory";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectActions";

-- DropTable
DROP TABLE "ProjectMembership";

-- DropTable
DROP TABLE "ProjectMembershipRole";

-- DropTable
DROP TABLE "ProjectRole";

-- DropTable
DROP TABLE "ProjectRoleActions";

-- DropTable
DROP TABLE "ProjectRoleHierarchy";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamActions";

-- DropTable
DROP TABLE "TeamMembership";

-- DropTable
DROP TABLE "TeamMembershipRole";

-- DropTable
DROP TABLE "TeamRole";

-- DropTable
DROP TABLE "TeamRoleActions";

-- DropTable
DROP TABLE "TeamRoleHierarchy";

-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "logo" TEXT,
    "banner" TEXT,
    "slogan" TEXT,
    "manifesto" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceMembership" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "SpaceMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spaceId" INTEGER NOT NULL,

    CONSTRAINT "SpaceRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceRoleHierarchy" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "SpaceRoleHierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceActions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceRoleActions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceRoleActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceMembershipRole" (
    "id" SERIAL NOT NULL,
    "spaceMembershipId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceMembershipRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpaceActions_action_key" ON "SpaceActions"("action");

-- AddForeignKey
ALTER TABLE "SpaceMembership" ADD CONSTRAINT "SpaceMembership_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceMembership" ADD CONSTRAINT "SpaceMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRole" ADD CONSTRAINT "SpaceRole_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRoleHierarchy" ADD CONSTRAINT "SpaceRoleHierarchy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "SpaceRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRoleHierarchy" ADD CONSTRAINT "SpaceRoleHierarchy_childId_fkey" FOREIGN KEY ("childId") REFERENCES "SpaceRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRoleActions" ADD CONSTRAINT "SpaceRoleActions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SpaceRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRoleActions" ADD CONSTRAINT "SpaceRoleActions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "SpaceActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceMembershipRole" ADD CONSTRAINT "SpaceMembershipRole_spaceMembershipId_fkey" FOREIGN KEY ("spaceMembershipId") REFERENCES "SpaceMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceMembershipRole" ADD CONSTRAINT "SpaceMembershipRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SpaceRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
