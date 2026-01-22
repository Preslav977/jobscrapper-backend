import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface JWTBearerTokenInterface {
  token: string;
  authData: JwtPayload;
  verifyErrors: VerifyErrors;
}
