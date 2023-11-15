import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ApiEc, ApiException } from 'src/exceptions';
import { CredsService } from 'src/services/creds/creds.service';
import { verify } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { AuthSiginInRequest, AuthSisgnUpSuccessResponse } from '../auth/dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private credsService: CredsService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }


  private readonly loginAttempts = new Map<string, number>();
  private readonly maxLoginAttempts = 3;

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUserByEmail(data: Prisma.UserCreateInput): Promise<AuthSisgnUpSuccessResponse> {
    const { firstName, lastName, email, password } = data;

    const user = await this.getUserByEmail(email);
    if (user) {
      throw new ApiException(ApiEc.EmailAlreadyRegistered);
    }
    if (!await this.credsService.isPasswordStrong(password)) {
      throw new ApiException(ApiEc.PasswordNotStrong)
    }

    if (!(password.length >= 6 && password.length <= 12)) {
      throw new ApiException(ApiEc.PasswordLength)
    }

    data.password = await this.credsService.passwordHash(password);
    const newUser = await this.prisma.user.create({
      data,
    });

    const token = await this.jwtService.createEmailConfirmToken(newUser.email);
    const accsessToken = await this.jwtService.createSessionJWT(newUser.email, newUser.id);
    await this.mailService.sendUserConfirmation(newUser, token);
    return accsessToken;
  }

  async userSignIn(data: AuthSiginInRequest): Promise<AuthSisgnUpSuccessResponse> {
    const { email, password } = data;

    if (this.isAccountLocked(email)) {
      throw new ApiException(ApiEc.UserNotFound) // Hesap kitli hatası dönder
    }

    if (!(await this.getUserByEmail(email))) {
      this.trackFailedLogin(email);
      throw new ApiException(ApiEc.UserNotFound)
    }
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user.email_confirmed == false) {
      throw new ApiException(ApiEc.NotAccept)
    }

    if (!(await this.credsService.passwordMatch(password, user.password))) {
      this.trackFailedLogin(email);
      throw new ApiException(ApiEc.PasswordNotMatch)
    };

    this.resetFailedLoginAttempts(email);
    const token = await this.jwtService.createSessionJWT(user.email, user.id);
    return token;
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput): Promise<any> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new ApiException(ApiEc.UserNotFound);
    }
    delete user.password;
    return user;
  }



  private isAccountLocked(email: string): boolean {
    // Hesap kilitli mi kontrolü
    const attempts = this.loginAttempts.get(email) || 0;
    return attempts >= this.maxLoginAttempts;
  }

  private trackFailedLogin(email: string): void {
    // Başarısız giriş denemesini takip et
    const attempts = this.loginAttempts.get(email) || 0;
    this.loginAttempts.set(email, attempts + 1);

    // Eğer belirli bir sayıda başarısız giriş denemesi yapılırsa, hesabı kilitle
    if (attempts + 1 >= this.maxLoginAttempts) {
      this.lockAccount(email);
    }
  }

  private async lockAccount(email: string) {
    // Hesabı burada kilitle veritabanından
    // const user = await this.getUserByEmail(email);
    // await this.prisma.blackList.create({
    //   user_id:user.id
    // })
    // console.log(`Hesap kilitlendi: ${email}`);
  }

  private resetFailedLoginAttempts(email: string): void {
    // Başarılı giriş durumunda başarısız giriş denemelerini sıfırla
    this.loginAttempts.delete(email);
  }

}
