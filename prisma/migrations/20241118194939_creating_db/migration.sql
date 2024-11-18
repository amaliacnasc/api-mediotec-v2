-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'COORDINATOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ConceitoEnum" AS ENUM ('E', 'B', 'R', 'I');

-- CreateEnum
CREATE TYPE "UnidadeEnum" AS ENUM ('UNIT1', 'UNIT2', 'AVG', 'FINAL');

-- CreateEnum
CREATE TYPE "ResultConceito" AS ENUM ('APPROVED', 'FAILED');

-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('EVENT', 'NEWS');

-- CreateTable
CREATE TABLE "User" (
    "userId" CHAR(36) NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "dateOfBirth" TIMESTAMP(3),
    "role" "Role" NOT NULL,
    "image" VARCHAR(255),
    "gender" "Gender" NOT NULL,
    "familyContact" VARCHAR(20),
    "affiliation" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" CHAR(36) NOT NULL,
    "courseName" VARCHAR(50) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "workload" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "Class" (
    "classId" CHAR(36) NOT NULL,
    "className" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "UserClassCourse" (
    "user_class_courseId" VARCHAR(36) NOT NULL,
    "courseId" CHAR(36) NOT NULL,
    "classId" CHAR(36) NOT NULL,
    "userId" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserClassCourse_pkey" PRIMARY KEY ("user_class_courseId")
);

-- CreateTable
CREATE TABLE "Conceito" (
    "conceitoId" CHAR(36) NOT NULL,
    "conceito" "ConceitoEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unidade" "UnidadeEnum" NOT NULL,
    "result" "ResultConceito" NOT NULL,
    "user_class_courseId" VARCHAR(45) NOT NULL,

    CONSTRAINT "Conceito_pkey" PRIMARY KEY ("conceitoId")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "announcementId" CHAR(36) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(2000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" CHAR(36) NOT NULL,
    "announcementType" "AnnouncementType" NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserClassCourse_courseId_classId_userId_key" ON "UserClassCourse"("courseId", "classId", "userId");

-- AddForeignKey
ALTER TABLE "UserClassCourse" ADD CONSTRAINT "UserClassCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClassCourse" ADD CONSTRAINT "UserClassCourse_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClassCourse" ADD CONSTRAINT "UserClassCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conceito" ADD CONSTRAINT "Conceito_user_class_courseId_fkey" FOREIGN KEY ("user_class_courseId") REFERENCES "UserClassCourse"("user_class_courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
