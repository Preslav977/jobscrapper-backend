import cron from "node-cron";
import { scrapJobs } from "../script/scrapJobs/scrapJobs.js";
import { scrapJobsDetails } from "../script/scrapJobsDetails/scrapJobsDetails.js";

interface TaskContext {
  date: Date;
  dateLocalIso: string;
  triggeredAt: Date;
  task?: any;
  execution?: any;
}

const task = cron.schedule(
  "0 10 * * *",
  async () => {
    await scrapJobs();

    return "done";
  },
  { noOverlap: true },
);

task.on("execution:started", (ctx: TaskContext) => {
  console.log(
    "Execution started at",
    ctx.date,
    "Reason:",
    ctx.execution?.reason,
  );
});

task.on("execution:finished", (ctx: TaskContext) => {
  console.log("Execution finished. Result:", ctx.execution?.result);
});

task.on("execution:failed", (ctx: TaskContext) => {
  console.error("Execution failed with error:", ctx.execution?.error?.message);
});

const task1 = cron.schedule(
  "0 12 * * *",
  async () => {
    await scrapJobsDetails();

    return "done";
  },
  { noOverlap: true },
);

task1.on("execution:started", (ctx: TaskContext) => {
  console.log(
    "Execution started at",
    ctx.date,
    "Reason:",
    ctx.execution?.reason,
  );
});

task1.on("execution:finished", (ctx: TaskContext) => {
  console.log("Execution finished. Result:", ctx.execution?.result);
});

task1.on("execution:failed", (ctx: TaskContext) => {
  console.error("Execution failed with error:", ctx.execution?.error?.message);
});
