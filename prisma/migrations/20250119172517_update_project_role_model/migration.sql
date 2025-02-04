-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('TEAM', 'PROJECT', 'DIRECTORY');

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "type" "SpaceType" DEFAULT 'TEAM';
