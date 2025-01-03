/*
  Warnings:

  - You are about to drop the column `level` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scope` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "level",
ADD COLUMN     "scope" "Scope" NOT NULL;

-- DropTable
DROP TABLE "Permission";

-- CreateTable
CREATE TABLE "Actions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "scope" "Scope" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleActions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleActions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Actions_action_key" ON "Actions"("action");

-- AddForeignKey
ALTER TABLE "RoleActions" ADD CONSTRAINT "RoleActions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleActions" ADD CONSTRAINT "RoleActions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
