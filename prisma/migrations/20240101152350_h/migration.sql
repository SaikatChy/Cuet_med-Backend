/*
  Warnings:

  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_doctorId_fkey";

-- DropTable
DROP TABLE "doctors";

-- CreateTable
CREATE TABLE "doctor" (
    "doctorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT DEFAULT 'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1704119134/gws3txwehxg1fshckiax.png',
    "designation" TEXT NOT NULL,
    "role" "DoctorRole" NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("doctorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_email_key" ON "doctor"("email");

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;
