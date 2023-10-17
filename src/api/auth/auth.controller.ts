import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post("/")
    async signup(@Body() data: Prisma.UserCreateInput): Promise<any> {
        return await this.authService.signup(data);
    }

}
