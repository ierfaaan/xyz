/*
  Warnings:

  - You are about to drop the column `parentId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `accessList` on the `ProjectMembership` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `ProjectMembership` table. All the data in the column will be lost.
  - You are about to drop the column `accessList` on the `TeamMembership` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `TeamMembership` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Scope" AS ENUM ('TEAM', 'PROJECT');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "accessList",
DROP COLUMN "role",
ADD COLUMN     "roleName" TEXT;

-- AlterTable
ALTER TABLE "TeamMembership" DROP COLUMN "accessList",
DROP COLUMN "role",
ADD COLUMN     "roleName" TEXT;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "scope" "Scope" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembershipRole" (
    "id" SERIAL NOT NULL,
    "teamMembershipId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMembershipRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMembershipRole" (
    "id" SERIAL NOT NULL,
    "projectMembershipId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMembershipRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembershipRole" ADD CONSTRAINT "TeamMembershipRole_teamMembershipId_fkey" FOREIGN KEY ("teamMembershipId") REFERENCES "TeamMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembershipRole" ADD CONSTRAINT "TeamMembershipRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembershipRole" ADD CONSTRAINT "ProjectMembershipRole_projectMembershipId_fkey" FOREIGN KEY ("projectMembershipId") REFERENCES "ProjectMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembershipRole" ADD CONSTRAINT "ProjectMembershipRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
