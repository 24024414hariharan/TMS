import { injectable, inject } from "inversify";
import { IUserRepository } from "../../domain/auth/IUserRepository";
import { AuthService } from "../../plugins/auth/AuthService";
import bcrypt from "bcrypt";
import TYPES from "../../../inversify.types";

@injectable()
export class LoginUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.AuthService) private authService: AuthService
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ token: string } | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const token = this.authService.generateToken(user.id, user.role);
    return { token };
  }
}
