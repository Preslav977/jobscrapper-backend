import type { JsonObject } from "@prisma/client/runtime/client";

export interface InstructionsInterface {
  id?: number;
  extractionInstructions: JsonObject;
  companyID: number;
}
