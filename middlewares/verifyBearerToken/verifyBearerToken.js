import jwt from "jsonwebtoken";
function verifyBearerToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                req.authData = authData;
                next();
            }
        });
    }
    else {
        res.sendStatus(403);
    }
}
export { verifyBearerToken };
//# sourceMappingURL=verifyBearerToken.js.map