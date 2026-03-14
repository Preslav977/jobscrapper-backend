import type { StepsInterface } from "../StepsInterface/StepsInterface.js";

export type ExtractionConfig = {
  container: { extractType: string; selector: string };
};

export interface InstructionsInterface {
  id?: number;
  companyID: number;
  extractionInstructions: ExtractionConfig;
  steps?: StepsInterface[];
}
