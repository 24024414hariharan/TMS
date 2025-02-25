import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { kernal } from "../../../../inversify.config";
import TYPES from "../../../../inversify.types";
import { KnowledgeBaseController } from "../controllers/KnowledgeBaseController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const kbController = kernal.get<KnowledgeBaseController>(
  TYPES.KnowledgeBaseController
);

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


router.get(
  "/",
  asyncHandler((req, res, next) => kbController.listArticles(req, res))
);

router.get(
  "/:articleId",
  asyncHandler((req, res, next) => kbController.getArticle(req, res))
);

export default router;
