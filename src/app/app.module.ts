import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/api/auth/auth.module';
import { UserModule } from 'src/api/user/user.module';
import { CredsModule } from 'src/services/creds/creds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CredsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
