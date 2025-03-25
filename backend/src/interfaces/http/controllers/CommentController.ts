import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../../../inversify.types";
import { AddCommentUseCase } from "../../../application/comment/AddCommentUseCase";
import { GetCommentsUseCase } from "../../../application/comment/GetCommentsUseCase";

@injectable()
export class CommentController {
  constructor(
    @inject(TYPES.AddCommentUseCase)
    private readonly addCommentUseCase: AddCommentUseCase,
    @inject(TYPES.GetCommentsUseCase)
    private readonly getCommentsUseCase: GetCommentsUseCase
  ) {}

  async addComment(req: Request, res: Response) {
    try {
      const ticketId = parseInt(req.params.ticketId);
      const { text } = req.body;
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const comment = await this.addCommentUseCase.execute(
        ticketId,
        req.user.userId,
        text
      );
      return res.status(201).json(comment);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getComments(req: Request, res: Response) {
    try {
      const ticketId = parseInt(req.params.ticketId);
      const comments = await this.getCommentsUseCase.execute(ticketId);
      return res.status(200).json(comments);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
