import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { SessionsModule } from '../sessions/sessions.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, SessionsModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
