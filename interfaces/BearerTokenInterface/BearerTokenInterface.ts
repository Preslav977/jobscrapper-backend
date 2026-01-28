import type { Request } from "express";
import type { UserInterface } from "../UserInterface/UserInterface.js";

export interface BearerTokenInterface extends Request {
  token: string;
  authData: UserInterface;
}
