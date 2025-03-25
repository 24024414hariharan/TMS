import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";

@injectable()
export class GetTicketUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private readonly ticketRepository: ITicketRepository
  ) {}

  async execute(ticketId: number, userId: number, role: string): Promise<Ticket | null> {
    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) return null;
    if (role !== "agent" && ticket.customerId !== userId) {
      return null;
    }
    return ticket;
  }
}