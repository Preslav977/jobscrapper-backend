/*
  Warnings:

  - You are about to drop the column `employment_type` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_type` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `URL` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullTimeOrNot` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hybridOrRemote` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "URL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "employment_type",
DROP COLUMN "job_type",
ADD COLUMN     "fullTimeOrNot" TEXT NOT NULL,
ADD COLUMN     "hybridOrRemote" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Instructions" (
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

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
