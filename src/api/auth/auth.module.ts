import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { SessionsModule } from '../sessions/sessions.module';


@Module({
  imports:[UserModule,SessionsModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService]
})
export class AuthModule {}
