declare function createTestUser(): Promise<{
    id: number;
    token: any;
}>;
declare function createTestCompany(): Promise<{
    id: number;
    name: string;
    logo: string | null;
    URL: string;
    scrapMode: import("../../generated/prisma/enums.js").ScrapMode;
}>;
declare function createTestInstructions(): Promise<{
    companyId: number;
    token: any;
    instructions: any;
    instructionsID: any;
}>;
declare function createTestSteps(): Promise<{
    companyID: number;
    token: any;
    steps: any;
    stepsID: any;
}>;
declare function createTestJobs(): Promise<{
    jobs: any;
    companyID: number;
    token: any;
    jobID: any;
}>;
export { createTestCompany, createTestInstructions, createTestJobs, createTestSteps, createTestUser, };
//# sourceMappingURL=helperFunctions.d.ts.map