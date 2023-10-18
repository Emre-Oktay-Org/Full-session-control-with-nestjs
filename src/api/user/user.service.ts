import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ApiEc, ApiException } from 'src/exceptions';
import { CredsService } from 'src/services/creds/creds.service';
import { verify } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private credsService: CredsService,
    private jwtService: JwtService,
    private mailService: MailService,

  ) { }

  async getUserByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUserByEmail(data: Prisma.UserCreateInput): Promise<any> {
    const { firstName, lastName, email, password } = data;

    const user = await this.getUserByEmail(email);
    if (user) {
      throw new ApiException(ApiEc.EmailAlreadyRegistered);
    }

    data.password = await this.credsService.passwordHash(password);
    const newUser = await this.prisma.user.create({
      data,
    });

    const token = await this.jwtService.signAsync(
      { email: newUser.email, id: newUser.id },
      { expiresIn: '5m', secret: process.env.JWT_SECRET },
    );

    await this.mailService.sendUserConfirmation(newUser, token);
    return newUser;
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput): Promise<any> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  
}
