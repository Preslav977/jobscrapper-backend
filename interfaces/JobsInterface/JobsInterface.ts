import type { Prisma } from "../../generated/prisma/client.js";

export type FormattedJobsType = {
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  other: string[];
};

export interface JobsInterface {
  id: number;
  title: string;
  location: string;
  remoteOrHybrid: string;
  datePosted: Date;
  description: string;
  anchorHref: string;
  companyID: number;
  rawHTML: string;
  // scrapedText: FormattedJobsType;
}

export type ScrapedJobsArrayType = {
  title: string | null;
  location: string | null;
  remoteOrHybrid: string | null;
  datePosted: string | null;
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
