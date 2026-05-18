import { verifyBearerToken } from "../verifyBearerToken/verifyBearerToken.js";
export function conditionalRouteMiddleware(req, res, next) {
    if (req.path === "/users/login" || req.method === "GET") {
        verifyBearerToken(req, res, next);
    }
    else if (req.method !== "GET") {
        verifyBearerToken(req, res, next);
    }
    else {
        next();
    }
}
//# sourceMappingURL=conditionalRouteMiddleware.js.map