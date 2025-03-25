import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";

@injectable()
export class SearchTicketsUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private readonly ticketRepository: ITicketRepository
  ) {}

  async execute(query: string, userId: number, role: string): Promise<Ticket[]> {
    if (role !== "agent") {
      return await this.ticketRepository.searchByCustomer(query, userId);
    } else {
      return await this.ticketRepository.search(query);
    }
  }
}