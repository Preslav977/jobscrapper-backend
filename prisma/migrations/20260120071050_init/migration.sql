/*
  Warnings:

  - You are about to drop the column `date_posted` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_description` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `datePosted` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "date_posted",
DROP COLUMN "job_description",
DROP COLUMN "job_title",
ADD COLUMN     "datePosted" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL;
