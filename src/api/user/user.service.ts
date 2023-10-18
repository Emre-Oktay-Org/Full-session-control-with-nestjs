import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ApiEc, ApiException } from 'src/exceptions';
import { CredsService } from 'src/services/creds/creds.service';
import { MailService } from '../mail/mail.service';
import { verify } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private credsService: CredsService,
        private readonly maileService: MailService) { }

    async getUserByEmail(email: string): Promise<any> {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async createUserByEmail(data: Prisma.UserCreateInput): Promise<any> {
        const { firstName, lastName, email, password } = data;

        const user = await this.getUserByEmail(email);
        if (user) {
            throw new ApiException(ApiEc.EmailAlreadyRegistered);
        }

        data.password = await this.credsService.passwordHash(password)
        const newUser = await this.prisma.user.create({
            data
        });

        const verifyCode= await this.credsService.generateVerifyCode();
        await this.maileService.sendEmail({
            firstName,
            lastName,
            email,
            context: 'signup',
            verifyCode
        });

        return newUser;

    }
}