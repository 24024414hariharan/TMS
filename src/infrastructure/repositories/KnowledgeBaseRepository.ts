import { IKnowledgeBaseRepository } from "../../domain/knowledgeBase/IKnowledgeBaseRepository";
import { Article } from "../../domain/knowledgeBase/Article";
import { prisma } from "../database/PrismaClient";

export class KnowledgeBaseRepository implements IKnowledgeBaseRepository {
  async findAll(): Promise<Article[]> {
    const articles = await prisma.article.findMany();
    return articles as Article[];
  }

  async findById(articleId: number): Promise<Article | null> {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    return article as Article | null;
  }
}
