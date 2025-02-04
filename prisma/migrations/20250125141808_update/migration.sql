/*
  Warnings:

  - You are about to drop the `SpaceRoleHierarchy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpaceRoleHierarchy" DROP CONSTRAINT "SpaceRoleHierarchy_childId_fkey";

-- DropForeignKey
ALTER TABLE "SpaceRoleHierarchy" DROP CONSTRAINT "SpaceRoleHierarchy_parentId_fkey";

-- AlterTable
ALTER TABLE "SpaceRole" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "SpaceRoleHierarchy";
