import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../../../inversify.types";
import { ListArticlesUseCase } from "../../../application/knowledgeBase/ListArticlesUseCase";
import { GetArticleUseCase } from "../../../application/knowledgeBase/GetArticleUseCase";

@injectable()
export class KnowledgeBaseController {
  constructor(
    @inject(TYPES.ListArticlesUseCase)
    private readonly listArticlesUseCase: ListArticlesUseCase,
    @inject(TYPES.GetArticleUseCase)
    private readonly getArticleUseCase: GetArticleUseCase
  ) {}

  async listArticles(req: Request, res: Response) {
    try {
      const articles = await this.listArticlesUseCase.execute();
      return res.status(200).json(articles);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getArticle(req: Request, res: Response) {
    try {
      const articleId = parseInt(req.params.articleId);
      const article = await this.getArticleUseCase.execute(articleId);
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      return res.status(200).json(article);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
