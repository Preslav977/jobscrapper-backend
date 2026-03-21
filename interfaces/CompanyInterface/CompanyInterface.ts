import { Prisma } from "../../generated/prisma/client.js";
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

export type CompanyWithRelationsType = Prisma.CompanyGetPayload<{
  include: {
    instructions: true;
    steps: true;
    jobs: true;
  };
}>;

export type CompanyWithSelectedFieldsType = Prisma.CompanyGetPayload<{
  select: {
    name: true;
    URL: true;
    logo: true;
    instructions: {
      omit: {
        id: true;
        companyID: true;
      };
    };
    steps: {
      omit: {
        id: true;
        companyID: true;
      };
    };
  };
}>;
