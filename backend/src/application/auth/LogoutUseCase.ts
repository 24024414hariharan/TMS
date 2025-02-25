import { injectable } from "inversify";

@injectable()
export class LogoutUseCase {
  async execute(): Promise<boolean> {
    return true;
  }
}