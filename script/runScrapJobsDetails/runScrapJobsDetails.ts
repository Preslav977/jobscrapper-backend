import { scrapJobsDetails } from "../scrapJobsDetails/scrapJobsDetails.js";

console.log(`Execution started at ${new Date().toISOString()}`);

scrapJobsDetails()
  .then(() => {
    console.log("Execution finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Execution failed with error:", error.message);
    process.exit(1);
  });
