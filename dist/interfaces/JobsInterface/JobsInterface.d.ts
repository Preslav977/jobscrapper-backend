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
        title: string | null | undefined;
        location: string | null | undefined;
        remoteOrHybrid: string | null | undefined;
        datePosted: string | null | undefined;
        anchorHref: string | null | undefined;
    }>;
    err: string | null | unknown;
};
//# sourceMappingURL=JobsInterface.d.ts.map