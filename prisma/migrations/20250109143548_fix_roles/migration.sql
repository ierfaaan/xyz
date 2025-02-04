/*
  Warnings:

  - You are about to drop the column `roleName` on the `ProjectMembership` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `TeamMembership` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `TeamMembership` table. All the data in the column will be lost.
  - You are about to drop the `Actions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleActions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectMembershipRole" DROP CONSTRAINT "ProjectMembershipRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RoleActions" DROP CONSTRAINT "RoleActions_actionId_fkey";

-- DropForeignKey
ALTER TABLE "RoleActions" DROP CONSTRAINT "RoleActions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembershipRole" DROP CONSTRAINT "TeamMembershipRole_roleId_fkey";

-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "roleName";

-- AlterTable
ALTER TABLE "TeamMembership" DROP COLUMN "parentId",
DROP COLUMN "roleName";

-- DropTable
DROP TABLE "Actions";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "RoleActions";

-- DropEnum
DROP TYPE "Scope";

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamActions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectActions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRoleActions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamRoleActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRoleActions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRoleActions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamRole_name_key" ON "TeamRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRole_name_key" ON "ProjectRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamActions_action_key" ON "TeamActions"("action");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectActions_action_key" ON "ProjectActions"("action");

-- AddForeignKey
ALTER TABLE "TeamRoleActions" ADD CONSTRAINT "TeamRoleActions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TeamRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoleActions" ADD CONSTRAINT "TeamRoleActions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "TeamActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRoleActions" ADD CONSTRAINT "ProjectRoleActions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ProjectRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRoleActions" ADD CONSTRAINT "ProjectRoleActions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "ProjectActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembershipRole" ADD CONSTRAINT "TeamMembershipRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TeamRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembershipRole" ADD CONSTRAINT "ProjectMembershipRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ProjectRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
