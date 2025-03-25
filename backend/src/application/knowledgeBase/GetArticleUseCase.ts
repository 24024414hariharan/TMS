import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { IKnowledgeBaseRepository } from "../../domain/knowledgeBase/IKnowledgeBaseRepository";
import { Article } from "../../domain/knowledgeBase/Article";

@injectable()
export class GetArticleUseCase {
  constructor(
    @inject(TYPES.IKnowledgeBaseRepository)
    private readonly kbRepository: IKnowledgeBaseRepository
  ) {}

  async execute(articleId: number): Promise<Article | null> {
    return await this.kbRepository.findById(articleId);
  }
}
