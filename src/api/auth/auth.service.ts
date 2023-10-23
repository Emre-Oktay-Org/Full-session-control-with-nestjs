import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { exit } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsService } from 'src/services/creds/creds.service';
import { UserService } from '../user/user.service';
import {
  AuthEmailConfirmRequest,
  AuthForgotPasswordRequest,
  AuthResetPasswordRequest,
  AuthSigninRequest,
} from './dto';
import { SessionsService } from '../sessions/sessions.service';
import { ApiEc, ApiException } from 'src/exceptions';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from 'src/services/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionsService,
    private jwtService: JwtService,
    private mailService: MailService,
    private credsService: CredsService,
  ) {}

  async userEmailConfirm(token: string): Promise<any> {
    const { email } = await this.jwtService.verifyEmailConfirmToken(token);
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }

    const updatedUser = await this.userService.updateUserById(user.id, {
      email_confirmed: true,
    });
    if (updatedUser.email_confirmed) {
      return {
        message: 'Email confirmed',
      };
    }

    throw new ApiException(ApiEc.EmailNotConfirmed);
  }

  async signup(data: Prisma.UserCreateInput): Promise<any> {
    return await this.userService.createUserByEmail(data);
  }

  async signin(data: AuthSigninRequest): Promise<any> {
    return await this.sessionService.createUserSession(data);
  }

  async emailConfirm(data: AuthEmailConfirmRequest): Promise<any> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }

    if (user.email_confirmed) {
      throw new ApiException(ApiEc.EmailAlreadyConfirmed);
    }

    const token = await this.jwtService.createEmailConfirmToken(user.email);

    await this.mailService.sendUserConfirmation(user, token);
    return {
      message: 'Email sent',
    };
  }
  
  async forgotPassword(data: AuthForgotPasswordRequest): Promise<any> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }
    if (!user.email_confirmed) {
      throw new ApiException(ApiEc.EmailNotConfirmed);
    }

    const token = await this.jwtService.createResetPasswordToken(user.email);

    await this.mailService.sendUserForgotPassword(user, token);
    return {
      message: 'Email sent',
    };
  }

  async resetPassword(
    data: AuthResetPasswordRequest,
    token: string,
  ): Promise<any> {
    // validate token
    const { email } = await this.jwtService.verifyResetPasswordToken(token);

    // check if user exists
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }

    // update user password
    const hashedPassword = await this.credsService.passwordHash(data.password);
    const updatedUser = await this.userService.updateUserById(user.id, {
      password: hashedPassword,
    });

    return {
      message: 'Password updated',
    };
  }
}
