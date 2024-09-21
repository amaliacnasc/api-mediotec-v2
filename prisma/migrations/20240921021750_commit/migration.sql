/*
  Warnings:

  - The primary key for the `classcourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `classcourse` table. All the data in the column will be lost.
  - The primary key for the `userclass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userclass` table. All the data in the column will be lost.
  - The primary key for the `usercourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usercourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `classcourse` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`classId`, `courseId`);

-- AlterTable
ALTER TABLE `userclass` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `classId`);

-- AlterTable
ALTER TABLE `usercourse` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `courseId`);
