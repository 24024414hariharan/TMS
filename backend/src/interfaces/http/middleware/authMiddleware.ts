import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../../../../config/config";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const authenticateToken: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  jwt.verify(token, config.jwtSecret as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = user as any;
    next();
  });
};
