import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { exit } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsService } from 'src/services/creds/creds.service';
import { UserService } from '../user/user.service';
import { AuthSigninRequest } from './dto';
import { SessionsService } from '../sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionsService,
    private jwtService: JwtService,
  ) {}
  async UserEmailConfirm(token: string): Promise<any> {
    // jwt verify token
    const { email, id } = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    // find user by email
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }
    const updatedUser = await this.userService.updateUserById(id, {
      email_confirmed: true,
    });
    if (!updatedUser.email_confirmed) {
      throw new ApiException(ApiEc.UserNotFound);
    }
    return {
      message: 'Email confirmed',
    };
  }
  async signup(data: Prisma.UserCreateInput): Promise<any> {
    return await this.userService.createUserByEmail(data);
  }

  async signin(data: AuthSigninRequest): Promise<any> {
    return await this.sessionService.createUserSession(data);
  }
}
