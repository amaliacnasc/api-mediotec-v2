/*
  Warnings:

  - Added the required column `result` to the `Conceito` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResultConceito" AS ENUM ('APPROVED', 'FAILED');

-- AlterTable
ALTER TABLE "Conceito" ADD COLUMN     "result" "ResultConceito" NOT NULL;
