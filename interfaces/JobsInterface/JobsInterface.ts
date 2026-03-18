export interface JobsInterface {
  id: number;
  title: string;
  location: string;
  remoteOrHybrid: string;
  datePosted: Date;
  description: string;
  anchorHref: string;
  companyID: number;
}

export type ScrapedJobsObjectType = {
  success: true | false | null;
  jobs: Array<{
    title: string | null;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    anchorHref: string | null;
  }>;
  err: string | null | unknown;
};
