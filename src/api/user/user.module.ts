import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsModule } from 'src/services/creds/creds.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[CredsModule,MailModule],
  controllers: [],
  providers: [UserService,PrismaService,JwtService],
  exports:[UserService]
})
export class UserModule {}
