/*
  Warnings:

  - Added the required column `announcementType` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('EVENT', 'NEWS');

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "announcementType" "AnnouncementType" NOT NULL;
