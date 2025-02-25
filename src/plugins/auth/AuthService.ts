import jwt from "jsonwebtoken";
import config from "../../../config/config";

export class AuthService {
  generateToken(userId: number, role: string): string {
    const payload = { userId, role };
    return jwt.sign(payload, config.jwtSecret as string, {
      expiresIn: config.jwtExpiresIn as any,
      algorithm: "HS256",
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, config.jwtSecret as string);
  }
};
