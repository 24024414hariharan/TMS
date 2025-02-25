import { ITicketRepository } from "../../domain/ticket/ITicketRepository";
import { Ticket } from "../../domain/ticket/Ticket";
import { prisma } from "../database/PrismaClient";

export class TicketRepository implements ITicketRepository {
  async create(ticket: Ticket): Promise<Ticket> {
    const createdTicket = await prisma.ticket.create({
      data: {
        customerId: ticket.customerId,
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
    });
    return createdTicket as Ticket;
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      include: {
        comments: true,
      },
    });
    return tickets as Ticket[];
  }

  async findById(ticketId: number): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    return ticket as Ticket | null;
  }

  async findByCustomerId(customerId: number): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: { customerId },
      include: {
        comments: true,
      },
    });
    return tickets as Ticket[];
  }

  async update(ticketId: number, updateData: Partial<Ticket>): Promise<Ticket> {
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: updateData,
      include: {
        comments: true,
      },
    });
    return updatedTicket as Ticket;
  }

  async delete(ticketId: number): Promise<void> {
    await prisma.ticket.delete({
      where: { id: ticketId },
    });
  }

  async search(query: string): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: {
        OR: [
          { subject: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        comments: true,
      },
    });
    return tickets as Ticket[];
  }

  async searchByCustomer(query: string, customerId: number): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: {
        customerId,
        OR: [
          { subject: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        comments: true,
      },
    });
    return tickets as Ticket[];
  }
}
