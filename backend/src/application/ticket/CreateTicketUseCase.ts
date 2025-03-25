import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";

export interface CreateTicketDTO {
  customerId: number;
  subject: string;
  description: string;
  priority: string;
}

@injectable()
export class CreateTicketUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private readonly ticketRepository: ITicketRepository
  ) {}

  async execute(data: CreateTicketDTO): Promise<Ticket> {
    const ticket: Ticket = {
      customerId: data.customerId,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: "open",
      createdAt: new Date(),
    };
    const createdTicket = await this.ticketRepository.create(ticket);
    return createdTicket;
  }
}
