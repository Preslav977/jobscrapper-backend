import type { JwtPayload } from "jsonwebtoken";

export interface JWTBearerTokenInterface {
  token: string;
  authData: JwtPayload;
}
