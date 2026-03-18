import type { StepsInterface } from "../StepsInterface/StepsInterface.js";

export type ExtractionConfig = {
  container: { extractType: string; selector: string; attr?: string };
  title: { extractType: string; selector: string; attr?: string } | null;
  location: { extractType: string; selector: string; attr?: string } | null;
  remoteOrHybrid: {
    extractType: string;
    selector: string;
    attr?: string;
  } | null;
  datePosted: { extractType?: string; selector?: string; attr?: string } | null;
  anchorHref: { extractType: string; selector?: string; attr?: string } | null;
};

export interface InstructionsInterface {
  id?: number;
  companyID?: number;
  extractionInstructions: ExtractionConfig;
  steps?: StepsInterface[];
}
