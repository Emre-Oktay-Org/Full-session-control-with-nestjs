import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthSigninRequest, AuthSignupRequest } from './dto';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() data: AuthSignupRequest): Promise<any> {
    const newUser = await this.authService.signup(data);
    const { email, id } = newUser;
    const token = await this.jwtService.signAsync(
      { email, id },
      { expiresIn: '5m', secret: process.env.JWT_SECRET },
    );
    await this.mailService.sendUserConfirmation(newUser, token);
    return newUser;
  }

  @Post('signin')
  async signin(@Body() data: AuthSigninRequest): Promise<any> {
    return await this.authService.signin(data);
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string): Promise<any> {
    return await this.authService.UserEmailConfirm(token);
  }
}
