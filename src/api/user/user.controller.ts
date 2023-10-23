import { Controller, Get, Session, UseGuards,Request } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@ApiTags("User")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getMyProfile')
  async getMyProfile(
    @Request() req
  ): Promise<any> {
    return await this.userService.getUserById(req.user.id);
  }
}
