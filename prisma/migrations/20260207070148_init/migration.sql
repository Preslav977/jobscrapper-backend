-- AlterTable
ALTER TABLE "instructions" ADD COLUMN     "careersHoverButton" TEXT,
ADD COLUMN     "jobCategoryClickSelect" TEXT,
ADD COLUMN     "jobsContainerDesc" TEXT,
ADD COLUMN     "jobsContainerDetailsAnchor" TEXT,
ADD COLUMN     "jobsContainerLocation" TEXT,
ADD COLUMN     "jobsContainerTitle" TEXT,
ADD COLUMN     "joinUsHoverButton" TEXT,
ADD COLUMN     "locationClickSelect" TEXT;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "jobAnchor" TEXT;
