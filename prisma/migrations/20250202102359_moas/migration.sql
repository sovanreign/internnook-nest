-- CreateEnum
CREATE TYPE "MoaStatus" AS ENUM ('Pending', 'Completed');

-- CreateTable
CREATE TABLE "MOA" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "coordinatorId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "studentSigned" BOOLEAN NOT NULL DEFAULT false,
    "coordinatorSigned" BOOLEAN NOT NULL DEFAULT false,
    "companySigned" BOOLEAN NOT NULL DEFAULT false,
    "status" "MoaStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MOA_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MOA" ADD CONSTRAINT "MOA_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MOA" ADD CONSTRAINT "MOA_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MOA" ADD CONSTRAINT "MOA_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
