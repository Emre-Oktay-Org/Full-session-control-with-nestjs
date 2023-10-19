import { Controller, Get, Session } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getMyProfile')
  async getMyProfile(@Session() session: Record<string, any>): Promise<User> {
    return await this.userService.getUserById(session.user_id);
  }
}
