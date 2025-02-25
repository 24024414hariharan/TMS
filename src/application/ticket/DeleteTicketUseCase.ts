import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ITicketRepository } from "../../domain/ticket/ITicketRepository";

@injectable()
export class DeleteTicketUseCase {
  constructor(
    @inject(TYPES.ITicketRepository) private ticketRepository: ITicketRepository
  ) {}

  async execute(ticketId: number, role: string): Promise<void> {
    if (role !== "agent") {
      throw new Error("Unauthorized: Only agents can close or delete a ticket");
    }
    await this.ticketRepository.delete(ticketId);
  }
}
