/*
  Warnings:

  - Added the required column `courseNamw` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `courseNamw` VARCHAR(50) NOT NULL;
