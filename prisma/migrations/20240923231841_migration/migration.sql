/*
  Warnings:

  - You are about to drop the column `courseNamw` on the `course` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `courseNamw`,
    ADD COLUMN `courseName` VARCHAR(50) NOT NULL;
