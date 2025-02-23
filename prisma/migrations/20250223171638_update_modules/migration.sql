/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FormModule` table. All the data in the column will be lost.
  - You are about to drop the column `spaceId` on the `FormModule` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `FormModule` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `FormModule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FormModule` table. All the data in the column will be lost.
  - You are about to drop the `FormSpaceMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `moduleId` to the `FormModule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('ACTIVE', 'BUILDING', 'PUBLISHED', 'DISABLED');

-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('FORM_GENERATOR');

-- CreateEnum
CREATE TYPE "SpaceModulesMembersRole" AS ENUM ('OWNER', 'MEMBER', 'REPORT_VIEWER');

-- DropForeignKey
ALTER TABLE "FormModule" DROP CONSTRAINT "FormModule_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "FormSpaceMembers" DROP CONSTRAINT "FormSpaceMembers_formId_fkey";

-- DropForeignKey
ALTER TABLE "FormSpaceMembers" DROP CONSTRAINT "FormSpaceMembers_spaceMemberId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmitions" DROP CONSTRAINT "FormSubmitions_formMemberId_fkey";

-- AlterTable
ALTER TABLE "FormModule" DROP COLUMN "createdAt",
DROP COLUMN "spaceId",
DROP COLUMN "status",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "FormSpaceMembers";

-- DropEnum
DROP TYPE "FormSpaceMembersRole";

-- DropEnum
DROP TYPE "FormStatus";

-- CreateTable
CREATE TABLE "SpaceModules" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ModuleStatus" DEFAULT 'BUILDING',
    "spaceId" INTEGER NOT NULL,
    "moduleType" "ModuleType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceModules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceModulesMembers" (
    "id" SERIAL NOT NULL,
    "spaceMemberId" INTEGER NOT NULL,
    "spaceModuleId" INTEGER NOT NULL,
    "Role" "SpaceModulesMembersRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "SpaceModulesMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpaceModules" ADD CONSTRAINT "SpaceModules_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceModulesMembers" ADD CONSTRAINT "SpaceModulesMembers_spaceMemberId_fkey" FOREIGN KEY ("spaceMemberId") REFERENCES "SpaceMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceModulesMembers" ADD CONSTRAINT "SpaceModulesMembers_spaceModuleId_fkey" FOREIGN KEY ("spaceModuleId") REFERENCES "SpaceModules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormModule" ADD CONSTRAINT "FormModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "SpaceModules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmitions" ADD CONSTRAINT "FormSubmitions_formMemberId_fkey" FOREIGN KEY ("formMemberId") REFERENCES "SpaceModulesMembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
