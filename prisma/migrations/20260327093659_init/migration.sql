/*
  Warnings:

  - Added the required column `scrapMode` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScrapMode" AS ENUM ('NAVIGATION', 'DIRECT', 'FETCH', 'JSON');

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "scrapMode" "ScrapMode" NOT NULL;
