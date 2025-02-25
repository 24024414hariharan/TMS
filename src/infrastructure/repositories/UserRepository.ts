import { injectable } from "inversify";
import { IUserRepository } from "../../domain/auth/IUserRepository";
import { User } from "../../domain/auth/User";
import { prisma } from "../database/PrismaClient";

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { email } });
    if (!userRecord) return null;
    return {
      id: userRecord.id,
      email: userRecord.email,
      password: userRecord.password,
      role: userRecord.role,
    };
  }
}
