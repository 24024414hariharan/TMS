import { Comment } from "./Comment";

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  findByTicketId(ticketId: number): Promise<Comment[]>;
}
