-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "remoteOrHybrid" DROP NOT NULL;
