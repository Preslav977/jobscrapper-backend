import { verifyBearerToken } from "../verifyBearerToken/verifyBearerToken.js";
export function conditionalRouteMiddleware(req, res, next) {
    if (req.method === "GET") {
        next();
    }
    else {
        verifyBearerToken(req, res, next);
    }
}
//# sourceMappingURL=conditionalRouteMiddleware.js.map