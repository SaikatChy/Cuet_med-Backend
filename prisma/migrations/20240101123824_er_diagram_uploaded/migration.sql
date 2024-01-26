-- CreateTable
CREATE TABLE "students" (
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "students_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "designation" TEXT NOT NULL,
    "specialization" JSONB NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "booklets" (
    "serialNo" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "Level" INTEGER NOT NULL,
    "Term" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "hallName" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "resident" BOOLEAN NOT NULL,

    CONSTRAINT "booklets_pkey" PRIMARY KEY ("serialNo")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "prescriptionId" TEXT NOT NULL,
    "bookletId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("prescriptionId")
);

-- CreateTable
CREATE TABLE "doses" (
    "prescriptionId" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "dose" TEXT NOT NULL,

    CONSTRAINT "doses_pkey" PRIMARY KEY ("prescriptionId","medicine")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "booklets_studentId_key" ON "booklets"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "booklets_mobileNo_key" ON "booklets"("mobileNo");

-- AddForeignKey
ALTER TABLE "booklets" ADD CONSTRAINT "booklets_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_bookletId_fkey" FOREIGN KEY ("bookletId") REFERENCES "booklets"("serialNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doses" ADD CONSTRAINT "doses_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("prescriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
