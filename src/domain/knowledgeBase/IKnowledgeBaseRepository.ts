import { Article } from "./Article";

export interface IKnowledgeBaseRepository {
  findAll(): Promise<Article[]>;
  findById(articleId: number): Promise<Article | null>;
}
