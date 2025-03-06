import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { kernal } from "../../../../inversify.config";
import TYPES from "../../../../inversify.types";
import { CommentController } from "../controllers/CommentController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const commentController = kernal.get<CommentController>(TYPES.CommentController);

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.use(authenticateToken);

router.post("/:ticketId/comments", asyncHandler((req, res, next) => commentController.addComment(req, res)));

router.get("/:ticketId/comments", asyncHandler((req, res, next) => commentController.getComments(req, res)));

export default router;
