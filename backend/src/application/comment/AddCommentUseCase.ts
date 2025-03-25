import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ICommentRepository } from "../../domain/comment/ICommentRepository";
import { Comment } from "../../domain/comment/Comment";

@injectable()
export class AddCommentUseCase {
  constructor(
    @inject(TYPES.ICommentRepository)
    private readonly commentRepository: ICommentRepository
  ) {}

  async execute(
    ticketId: number,
    authorId: number,
    text: string
  ): Promise<Comment> {
    const comment: Comment = {
      id: 0,
      ticketId,
      authorId,
      text,
      createdAt: new Date(),
    };
    const createdComment = await this.commentRepository.create(comment);
    return createdComment;
  }
}
