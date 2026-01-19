import type { Request, Response } from "express";
declare function createCompany(req: Request, res: Response): Promise<void>;
declare function getCompanies(req: Request, res: Response): Promise<void>;
declare function getCompanyByName(req: Request, res: Response): Promise<void>;
declare function updateCompany(req: Request, res: Response): Promise<void>;
export { createCompany, getCompanies, getCompanyByName, updateCompany };
//# sourceMappingURL=companyControllers.d.ts.map