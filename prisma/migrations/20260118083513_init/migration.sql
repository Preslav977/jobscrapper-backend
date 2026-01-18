/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instructions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Instructions" DROP CONSTRAINT "Instructions_companyID_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_companyID_fkey";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Instructions";

-- DropTable
DROP TABLE "Jobs";

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "URL" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "hybridOrRemote" TEXT NOT NULL,
    "fullTimeOrNot" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "companyID" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructions" (
    "id" SERIAL NOT NULL,
    "careersButton" TEXT,
    "joinUsButton" TEXT,
    "loadMoreButton" TEXT,
    "locationSelect" TEXT,
    "jobCategorySelect" TEXT,
    "jobTypingInput" TEXT,
    "submitFormButton" TEXT,
    "scrollToContainer" TEXT,
    "nextPageButton" TEXT,
    "jobsContainer" TEXT,
    "companyID" INTEGER NOT NULL,

    CONSTRAINT "instructions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructions" ADD CONSTRAINT "instructions_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
