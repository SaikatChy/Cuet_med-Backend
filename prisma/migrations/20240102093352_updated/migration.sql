/*
  Warnings:

  - You are about to drop the `doses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doses" DROP CONSTRAINT "doses_prescriptionId_fkey";

-- DropTable
DROP TABLE "doses";

-- CreateTable
CREATE TABLE "medicines" (
    "prescriptionId" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "dose" TEXT NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("prescriptionId","medicine")
);

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("prescriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
