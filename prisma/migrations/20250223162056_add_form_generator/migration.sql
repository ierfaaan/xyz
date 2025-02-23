-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('ACTIVE', 'BUILDING', 'PUBLISHED', 'DISABLED');

-- CreateEnum
CREATE TYPE "FormSpaceMembersRole" AS ENUM ('OWNER', 'MEMBER', 'REPORT_VIEWER');

-- CreateTable
CREATE TABLE "FormModule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "FormStatus" DEFAULT 'BUILDING',
    "spaceId" INTEGER NOT NULL,
    "fields" JSONB,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSpaceMembers" (
    "id" SERIAL NOT NULL,
    "spaceMemberId" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,
    "Role" "FormSpaceMembersRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "FormSpaceMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmitions" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "formMemberId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormModule" ADD CONSTRAINT "FormModule_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSpaceMembers" ADD CONSTRAINT "FormSpaceMembers_spaceMemberId_fkey" FOREIGN KEY ("spaceMemberId") REFERENCES "SpaceMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSpaceMembers" ADD CONSTRAINT "FormSpaceMembers_formId_fkey" FOREIGN KEY ("formId") REFERENCES "FormModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmitions" ADD CONSTRAINT "FormSubmitions_formMemberId_fkey" FOREIGN KEY ("formMemberId") REFERENCES "FormSpaceMembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmitions" ADD CONSTRAINT "FormSubmitions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "FormModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
