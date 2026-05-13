export type ExtractionConfig = {
    container: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    title: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    location: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    remoteOrHybrid: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    datePosted: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    responsibilities: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    requirements: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    niceToHave: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    benefits: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    interviewSteps: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
    anchorHref: {
        extractType: string;
        selector?: string;
        attr?: string;
    };
};
export interface InstructionsInterface {
    id?: number;
    companyID?: number;
    extractionInstructions: ExtractionConfig;
}
//# sourceMappingURL=InstructionsInterface.d.ts.map