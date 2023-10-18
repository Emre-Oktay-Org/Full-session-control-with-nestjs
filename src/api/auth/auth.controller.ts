import { Controller, Get, Post, Body, Query, Param, Session } from '@nestjs/common';
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
  ) { }

  @Post('signup')
  async signup(@Body() data: AuthSignupRequest): Promise<any> {
    return await this.authService.signup(data);
  }

  @Post('signin')
  async signin(
    @Body() data: AuthSigninRequest,
    @Session() session: Record<string, any>
  ): Promise<any> {
    const userrr = await this.authService.signin(data);
    session.user_id = userrr.id
    return userrr;
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string): Promise<any> {
    return await this.authService.UserEmailConfirm(token);
  }
}
