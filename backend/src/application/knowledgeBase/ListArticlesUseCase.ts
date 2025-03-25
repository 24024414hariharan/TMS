import { injectable, inject } from "inversify";
import TYPES from "../../../inversify.types";
import { IKnowledgeBaseRepository } from "../../domain/knowledgeBase/IKnowledgeBaseRepository";
import { Article } from "../../domain/knowledgeBase/Article";

@injectable()
export class ListArticlesUseCase {
  constructor(
    @inject(TYPES.IKnowledgeBaseRepository)
    private readonly kbRepository: IKnowledgeBaseRepository
  ) {}

  async execute(): Promise<Article[]> {
    return await this.kbRepository.findAll();
  }
}
