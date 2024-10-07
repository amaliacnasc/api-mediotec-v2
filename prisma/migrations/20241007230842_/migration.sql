-- DropForeignKey
ALTER TABLE "ClassCourse" DROP CONSTRAINT "ClassCourse_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassCourse" DROP CONSTRAINT "ClassCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Conceito" DROP CONSTRAINT "Conceito_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Conceito" DROP CONSTRAINT "Conceito_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserClass" DROP CONSTRAINT "UserClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "UserClass" DROP CONSTRAINT "UserClass_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- AddForeignKey
ALTER TABLE "Conceito" ADD CONSTRAINT "Conceito_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conceito" ADD CONSTRAINT "Conceito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassCourse" ADD CONSTRAINT "ClassCourse_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassCourse" ADD CONSTRAINT "ClassCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;
