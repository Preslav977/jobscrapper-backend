import type { JsonObject } from "@prisma/client/runtime/client";
import type { StepsInterface } from "../StepsInterface/StepsInterface.js";

export interface InstructionsInterface {
  id?: number;
  extractionInstructions: JsonObject;
  companyID: number;
  steps?: StepsInterface[];
}
