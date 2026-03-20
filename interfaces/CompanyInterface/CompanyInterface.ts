import type { Instructions, Steps } from "../../generated/prisma/client.js";

export interface CompanyInterface {
  id?: number;
  name: string;
  logo?: string | null;
  URL: string;
}

export interface CompanyRelationInterface extends CompanyInterface {
  instructions: Instructions[];
  steps: Steps[];
}
