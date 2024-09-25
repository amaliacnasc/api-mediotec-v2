/*
  Warnings:

  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'NOT_SPECIFIED') NOT NULL;
