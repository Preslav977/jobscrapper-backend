import type { JsonObject } from "@prisma/client/runtime/client";

export interface InstructionsInterface {
  id?: number;
  container: JsonObject;
  title: JsonObject;
  location: JsonObject;
  remoteOrHybrid: JsonObject;
  datePosted: JsonObject;
  description: JsonObject;
  anchorHref: JsonObject;
  companyID: JsonObject;
}
