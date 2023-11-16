import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {

  async createSessionJWT(email: string, id: number): Promise<any> {
    return await jwt.sign({ email, id }, process.env.JWT_SECRET, {
      expiresIn: '30m',
    });
  }

  async verifyJwt(token: string): Promise<any> {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }

  async createEmailConfirmToken(email: string): Promise<string> {
    return await jwt.sign({ email }, process.env.JWT_EMAIL_CONFIRM_SECRET, {
      expiresIn: '5m',
    });
  }

  async verifyEmailConfirmToken(token: string): Promise<any> {
    return await jwt.verify(token, process.env.JWT_EMAIL_CONFIRM_SECRET);
  }

  async createResetPasswordToken(email: string): Promise<string> {
    return await jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_SECRET, {
      expiresIn: '5m',
    });
  }

  async verifyResetPasswordToken(token: string): Promise<any> {
    return jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
  }
}
