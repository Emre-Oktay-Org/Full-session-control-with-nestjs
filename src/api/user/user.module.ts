import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsModule } from 'src/services/creds/creds.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[CredsModule,MailModule],
  controllers: [],
  providers: [UserService,PrismaService],
  exports:[UserService]
})
export class UserModule {}
