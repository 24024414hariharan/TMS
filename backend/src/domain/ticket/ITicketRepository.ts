import { Ticket } from "./Ticket";

export interface ITicketRepository {
  create(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findById(ticketId: number): Promise<Ticket | null>;
  findByCustomerId(customerId: number): Promise<Ticket[]>;
  update(ticketId: number, updateData: Partial<Ticket>): Promise<Ticket>;
  delete(ticketId: number): Promise<void>;
  search(query: string): Promise<Ticket[]>;
  searchByCustomer(query: string, customerId: number): Promise<Ticket[]>;
}