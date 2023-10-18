import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsModule } from 'src/services/creds/creds.module';

@Module({
  imports:[CredsModule],
  controllers: [],
  providers: [UserService,PrismaService],
  exports:[UserService]
})
export class UserModule {}
