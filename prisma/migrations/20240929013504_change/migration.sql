/*
  Warnings:

  - You are about to drop the column `authorId` on the `Announcements` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Announcements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_receiverId_fkey";

-- AlterTable
ALTER TABLE "Announcements" DROP COLUMN "authorId",
DROP COLUMN "receiverId";
