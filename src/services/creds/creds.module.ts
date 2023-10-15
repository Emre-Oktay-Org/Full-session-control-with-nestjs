import { Module } from '@nestjs/common';
import { CredsController } from './creds.controller';
import { CredsService } from './creds.service';

@Module({
  controllers: [CredsController],
  providers: [CredsService]
})
export class CredsModule {}
