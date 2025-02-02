/*
  Warnings:

  - Added the required column `applicationId` to the `MOA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MOA" ADD COLUMN     "applicationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MOA" ADD CONSTRAINT "MOA_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
