/*
  Warnings:

  - Added the required column `role` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentRole" AS ENUM ('student');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('admin');

-- CreateEnum
CREATE TYPE "DoctorRole" AS ENUM ('doctor');

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "role" "AdminRole" NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "role" "DoctorRole" NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "role" "StudentRole" NOT NULL;
