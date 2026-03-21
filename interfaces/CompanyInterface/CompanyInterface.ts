import type { InstructionsInterface } from "../InstructionsInterface/InstructionsInterface.js";
import type { StepsInterface } from "../StepsInterface/StepsInterface.js";

export interface CompanyInterface {
  id?: number;
  name: string;
  logo?: string | null;
  URL: string;
}

export interface CompanyRelationInterface extends CompanyInterface {
  instructions: InstructionsInterface[];
  steps: StepsInterface[];
}
