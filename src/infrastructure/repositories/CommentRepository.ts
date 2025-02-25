import { ICommentRepository } from "../../domain/comment/ICommentRepository";
import { Comment } from "../../domain/comment/Comment";
import { prisma } from "../database/PrismaClient";

export class CommentRepository implements ICommentRepository {
  async create(comment: Comment): Promise<Comment> {
    const createdComment = await prisma.comment.create({
      data: {
        ticketId: comment.ticketId,
        authorId: comment.authorId,
        text: comment.text,
        createdAt: comment.createdAt,
      },
    });
    return createdComment as Comment;
  }

  async findByTicketId(ticketId: number): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: { ticketId },
    });
    return comments as Comment[];
  }
}
