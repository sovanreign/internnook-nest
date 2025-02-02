/*
  Warnings:

  - Added the required column `companySlug` to the `MOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinatorSlug` to the `MOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSlug` to the `MOA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MOA" ADD COLUMN     "companySlug" TEXT NOT NULL,
ADD COLUMN     "coordinatorSlug" TEXT NOT NULL,
ADD COLUMN     "studentSlug" TEXT NOT NULL;
