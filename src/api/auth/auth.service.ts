import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { exit } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsService } from 'src/services/creds/creds.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private userService:UserService
    ) { }

    async signup(data: Prisma.UserCreateInput): Promise<any> {  
        return await this.userService.createUserByEmail(data);
    }
}
