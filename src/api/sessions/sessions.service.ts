import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiEc, ApiException } from 'src/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredsService } from 'src/services/creds/creds.service';

@Injectable()
export class SessionsService {

    constructor(
        private userService: UserService,
        private prisma: PrismaService,
        private credsService: CredsService
    ) { }

    async createUserSession(user) {
        const { email, password } = user;
        if (!(await this.userService.getUserByEmail(email))) {
            throw new ApiException(ApiEc.UserNotFound)
        }

        const userr = await this.prisma.user.findUnique({ where: { email } });

        if (userr.active == false) {
            throw new ApiException(ApiEc.NotAccept)
        }

        if (!(await this.credsService.passwordMatch(password, userr.password))) {
            throw new ApiException(ApiEc.PasswordNotMatch)
        };

        return true; // session olusturup burdan devam edilecek , session veritabanı yapılmadı.
    }
}