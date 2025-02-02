-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Looking', 'Signing', 'Hired');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'Looking';
