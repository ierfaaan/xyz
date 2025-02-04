-- CreateTable
CREATE TABLE "Announcements" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnouncementsRead" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "announcementId" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnnouncementsRead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementsRead" ADD CONSTRAINT "AnnouncementsRead_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "SpaceMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementsRead" ADD CONSTRAINT "AnnouncementsRead_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
