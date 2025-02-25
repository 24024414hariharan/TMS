import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";

@injectable()
export class ListTicketsUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private ticketRepository: ITicketRepository
  ) {}

  async execute(userId: number, role: string): Promise<Ticket[]> {
    if (role !== "agent") {
      return await this.ticketRepository.findByCustomerId(userId);
    } else {
      return await this.ticketRepository.findAll();
    }
  }
}