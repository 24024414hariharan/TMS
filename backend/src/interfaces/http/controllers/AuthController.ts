import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { LoginUseCase } from "../../../application/auth/LoginUseCase";
import { LogoutUseCase } from "../../../application/auth/LogoutUseCase";
import TYPES from "../../../../inversify.types";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.LoginUseCase) private readonly loginUseCase: LoginUseCase,
    @inject(TYPES.LogoutUseCase) private readonly logoutUseCase: LogoutUseCase
  ) {}
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.loginUseCase.execute(email, password);
    if (result) {
      return res.json(result);
    }
    return res.status(401).json({ message: "Invalid credentials" });
  }

  async logout(req: Request, res: Response) {
    await this.logoutUseCase.execute();
    return res.json({ message: "Logged out successfully" });
  }
}
