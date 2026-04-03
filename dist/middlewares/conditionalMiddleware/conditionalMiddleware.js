import { verifyBearerToken } from "../verifyBearerToken/verifyBearerToken.js";
export function conditionalMiddleware(req, res, next) {
    if (req.method === "GET") {
        next();
    }
    else {
        verifyBearerToken(req, res, next);
    }
}
//# sourceMappingURL=conditionalMiddleware.js.map