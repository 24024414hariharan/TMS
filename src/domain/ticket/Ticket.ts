export interface Ticket {
  id?: number;
  customerId: number;
  subject: string;
  description: string;
  priority: string;
  status: string;
  createdAt: Date;
}
