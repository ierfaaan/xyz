-- CreateTable
CREATE TABLE "TeamRoleHierarchy" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "TeamRoleHierarchy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamRoleHierarchy" ADD CONSTRAINT "TeamRoleHierarchy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TeamRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoleHierarchy" ADD CONSTRAINT "TeamRoleHierarchy_childId_fkey" FOREIGN KEY ("childId") REFERENCES "TeamRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
