import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { ICommentRepository } from "../../domain/comment/ICommentRepository";
import { Comment } from "../../domain/comment/Comment";

@injectable()
export class GetCommentsUseCase {
  constructor(
    @inject(TYPES.ICommentRepository)
    private commentRepository: ICommentRepository
  ) {}

  async execute(ticketId: number): Promise<Comment[]> {
    return await this.commentRepository.findByTicketId(ticketId);
  }
}
