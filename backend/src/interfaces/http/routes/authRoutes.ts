import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { kernal } from "../../../../inversify.config";
import TYPES from "../../../../inversify.types";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = kernal.get<AuthController>(TYPES.AuthController);

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post("/login", asyncHandler((req, res, next) => authController.login(req, res)));
router.post("/logout", asyncHandler((req, res, next) => authController.logout(req, res)));

export default router;
