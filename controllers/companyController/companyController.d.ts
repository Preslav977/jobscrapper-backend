import type { Request, Response } from "express";
declare function createCompany(req: Request, res: Response): Promise<void>;
declare function getCompanies(req: Request, res: Response): Promise<void>;
declare function getCompanyByName(req: Request, res: Response): Promise<void>;
declare function updateCompany(req: Request, res: Response): Promise<void>;
declare function deleteCompany(req: Request, res: Response): Promise<void>;
export { createCompany, deleteCompany, getCompanies, getCompanyByName, updateCompany, };
//# sourceMappingURL=companyController.d.ts.map