import type { JobsInterface } from "../JobsInterface/JobsInterface.js";

import type { InstructionsInterface } from "../InstructionsInterface/InstructionsInterface.js";

export interface CompanyInterface {
  id?: number;
  name: string;
  logo?: string;
  URL: string;
  jobs?: JobsInterface[];
  instructions?: InstructionsInterface[];
}
