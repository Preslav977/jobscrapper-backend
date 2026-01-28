import type { UserInterface } from "../interfaces/UserInterface/UserInterface.js";

declare global {
  namespace Express {
    interface Request {
      token: string;
      authData: UserInterface;
    }
  }
}

export {};
