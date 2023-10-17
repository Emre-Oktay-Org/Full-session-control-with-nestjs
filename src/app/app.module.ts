import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/api/auth/auth.module';
import { UserModule } from 'src/api/user/user.module';
import { CredsModule } from 'src/services/creds/creds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5432,
      username:"postgres",
      password:"8105693a",
      database:"postgres",
      synchronize:true
    }),AuthModule,UserModule,CredsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
