import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const requireRole = (allowedRoles: string | string[]): RequestHandler => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: insufficient privileges" });
      return;
    }
    next();
  };
};
