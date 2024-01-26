/*
  Warnings:

  - The primary key for the `medicines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `medicine` on the `medicines` table. All the data in the column will be lost.
  - Added the required column `name` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_pkey",
DROP COLUMN "medicine",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "medicines_pkey" PRIMARY KEY ("prescriptionId", "name");
