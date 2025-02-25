import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { kernal } from "../../../../inversify.config";
import TYPES from "../../../../inversify.types";
import { TicketController } from "../controllers/TicketController";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/requireRole";

const router = Router();
const ticketController = kernal.get<TicketController>(TYPES.TicketController);

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.use(authenticateToken);

router.post("/", asyncHandler((req, res, next) => ticketController.createTicket(req, res)));

router.get("/", asyncHandler((req, res, next) => ticketController.listTickets(req, res)));

router.get("/search", asyncHandler((req, res, next) => ticketController.searchTickets(req, res)));

router.get("/:ticketId", asyncHandler((req, res, next) => ticketController.getTicket(req, res)));

router.put("/:ticketId", requireRole("agent"), asyncHandler((req, res, next) => ticketController.updateTicket(req, res)));
router.delete("/:ticketId", requireRole("agent"), asyncHandler((req, res, next) => ticketController.deleteTicket(req, res)));

export default router;
