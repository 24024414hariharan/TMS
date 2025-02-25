import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";

export interface UpdateTicketDTO {
  subject?: string;
  description?: string;
  priority?: string;
  status?: string;
}

@injectable()
export class UpdateTicketUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private ticketRepository: ITicketRepository
  ) {}

  async execute(
    ticketId: number,
    updateData: UpdateTicketDTO,
    role: string
  ): Promise<Ticket> {
    if (updateData.status && role !== "agent") {
      throw new Error("Unauthorized: Only agents can update the ticket status");
    }
    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const updatedTicket = await this.ticketRepository.update(
      ticketId,
      updateData
    );
    return updatedTicket;
  }
}
