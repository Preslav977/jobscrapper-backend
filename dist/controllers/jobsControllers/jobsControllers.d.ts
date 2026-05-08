import type { Request, Response } from "express";
declare function createJobs(req: Request, res: Response): Promise<void>;
declare function getJobs(req: Request, res: Response): Promise<void>;
declare function getJobDetails(req: Request, res: Response): Promise<void>;
declare function getJobsBySearch(req: Request, res: Response): Promise<void>;
declare function updateJob(req: Request, res: Response): Promise<void>;
declare function deleteJob(req: Request, res: Response): Promise<void>;
export { createJobs, deleteJob, getJobDetails, getJobs, getJobsBySearch, updateJob, };
//# sourceMappingURL=jobsControllers.d.ts.map