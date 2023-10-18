import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthSigninRequest } from './dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post("signup")
    async signup(@Body() data: Prisma.UserCreateInput): Promise<any> {
        return await this.authService.signup(data);
    }

    @Post("signin")
    async signin(@Body() data:AuthSigninRequest):Promise<any>{
        return await this.authService.signin(data);
    }
}
