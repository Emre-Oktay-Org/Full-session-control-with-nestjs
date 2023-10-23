import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Session,
  Headers,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import {
  AuthEmailConfirmRequest,
  AuthForgotPasswordRequest,
  AuthResetPasswordRequest,
  AuthSiginInRequest,
  AuthSigninRequest,
  AuthSignupRequest,
  AuthSisgnUpSuccessResponse,
} from './dto';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) { }

  @Post('signup')
  async signup(@Body() data: AuthSignupRequest
  ): Promise<AuthSisgnUpSuccessResponse> {
    return await this.authService.signup(data);
  }

  @Post('signin')
  async signIn(
    @Body() data: AuthSiginInRequest,
    @Request() req
  ): Promise<AuthSisgnUpSuccessResponse> {
    const token = await this.authService.signIn(data);
    return token;
  }

  @Get('signout')
  async signout(@Session() session: Record<string, any>): Promise<any> {
    // destroy session
    session.destroy();
    return {
      message: 'Signed out',
    };
  }

  @Get('')
  async gett(@Session() session: Record<string, any>): Promise<any> {
    // destroy session
    return session;
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string): Promise<any> {
    return await this.authService.userEmailConfirm(token);
  }

  @Post('email-confirm')
  async emailConfirm(@Body() data: AuthEmailConfirmRequest): Promise<any> {
    return await this.authService.emailConfirm(data);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: AuthForgotPasswordRequest): Promise<any> {
    return await this.authService.forgotPassword(data);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() data: AuthResetPasswordRequest,
    @Query('token') token: string,
  ): Promise<any> {
    return await this.authService.resetPassword(data, token);
  }
}
