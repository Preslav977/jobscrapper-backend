import express from "express";
import path from "node:path";
import { companyRouter } from "./routes/companyRouter.js";
const app = express();
const assetsPath = path.join(__dirname, "/public");
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/companies", companyRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});
process.on("warning", (e) => {
    console.warn(e.stack);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app - listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map