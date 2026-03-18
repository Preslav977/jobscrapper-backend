import type { JobsInterface } from "../JobsInterface/JobsInterface.js";

import type { InstructionsInterface } from "../InstructionsInterface/InstructionsInterface.js";
import type { StepsInterface } from "../StepsInterface/StepsInterface.js";

export interface CompanyInterface {
  id?: number;
  name: string;
  logo?: string | null;
  URL: string;
  jobs?: JobsInterface[];
  instructions: InstructionsInterface[];
  steps: StepsInterface[];
}
