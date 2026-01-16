import express from "express";

import path from "node:path";

import type { NextFunction, Request, Response } from "express";

import { companyRouter } from "./routes/companyRouter";

const app = express();

const assetsPath = path.join(__dirname, "/public");

app.use(express.static(assetsPath));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/companies", companyRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).send(err.stack);
});

process.on("warning", (e) => {
  console.warn(e.stack);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}`);
});

export { app };
