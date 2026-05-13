import type { Prisma } from "../../generated/prisma/client.js";

export interface JobsInterface {
  id: number;
  title: string;
  location: string;
  remoteOrHybrid: string;
  datePosted: Date;
  responsibilities: string;
  requirements: string;
  niteToHave: string;
  interviewSteps: string;
  anchorHref: string;
  companyID: number;
}

export type ScrapedJobsArrayType = {
  title: string | null;
  location: string | null;
  remoteOrHybrid: string | null;
  datePosted: string | null;
  responsibilities: string | null;
  requirements: string | null;
  niteToHave: string | null;
  interviewSteps: string | null;
  anchorHref: string | null;
};

export type JobsWithRelationsType = Prisma.JobsGetPayload<{
  include: {
    company: {
      include: {
        instructions: true;
      };
    };
  };
}>;
