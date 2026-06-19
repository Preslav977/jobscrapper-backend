import { scrapJobs } from "../scrapJobs/scrapJobs.js";

console.log(`Execution started at ${new Date().toISOString()}`);

scrapJobs()
  .then(() => {
    console.log("Execution finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Execution failed with error:", error.message);
    process.exit(1);
  });
