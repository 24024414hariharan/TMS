import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../../../inversify.types";
import { CreateTicketUseCase } from "../../../application/ticket/CreateTicketUseCase";
import { ListTicketsUseCase } from "../../../application/ticket/ListTicketsUseCase";
import { GetTicketUseCase } from "../../../application/ticket/GetTicketUseCase";
import { UpdateTicketUseCase } from "../../../application/ticket/UpdateTicketUseCase";
import { DeleteTicketUseCase } from "../../../application/ticket/DeleteTicketUseCase";
import { SearchTicketsUseCase } from "../../../application/ticket/SearchTicketsUseCase";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

@injectable()
export class TicketController {
  constructor(
    @inject(TYPES.CreateTicketUseCase)
    private readonly createTicketUseCase: CreateTicketUseCase,
    @inject(TYPES.ListTicketsUseCase)
    private readonly listTicketsUseCase: ListTicketsUseCase,
    @inject(TYPES.GetTicketUseCase)
    private readonly getTicketUseCase: GetTicketUseCase,
    @inject(TYPES.UpdateTicketUseCase)
    private readonly updateTicketUseCase: UpdateTicketUseCase,
    @inject(TYPES.DeleteTicketUseCase)
    private readonly deleteTicketUseCase: DeleteTicketUseCase,
    @inject(TYPES.SearchTicketsUseCase)
    private readonly searchTicketsUseCase: SearchTicketsUseCase
  ) {}

  async createTicket(req: Request, res: Response) {
    try {
      const { subject, description, priority } = req.body;
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const ticket = await this.createTicketUseCase.execute({
        customerId: req.user.userId,
        subject,
        description,
        priority,
      });
      return res.status(201).json(ticket);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listTickets(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const tickets = await this.listTicketsUseCase.execute(
        req.user.userId,
        req.user.role
      );
      return res.json(tickets);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getTicket(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const ticketId = parseInt(req.params.ticketId);
      const ticket = await this.getTicketUseCase.execute(
        ticketId,
        req.user.userId,
        req.user.role
      );
      if (!ticket)
        return res
          .status(404)
          .json({ message: "Ticket not found or not authorized" });
      return res.json(ticket);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const ticketId = parseInt(req.params.ticketId);
      const updateData = req.body;
      const authReq = req as AuthenticatedRequest;
      if (!authReq.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const updatedTicket = await this.updateTicketUseCase.execute(
        ticketId,
        updateData,
        authReq.user.role
      );
      return res.json(updatedTicket);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteTicket(req: Request, res: Response) {
    try {
      const ticketId = parseInt(req.params.ticketId);
      const authReq = req as AuthenticatedRequest;
      if (!authReq.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      await this.deleteTicketUseCase.execute(ticketId, authReq.user.role);
      return res.json({ message: "Ticket closed/deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async searchTickets(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const { query } = req.query;
      const tickets = await this.searchTicketsUseCase.execute(
        query as string,
        req.user.userId,
        req.user.role
      );
      return res.json(tickets);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
