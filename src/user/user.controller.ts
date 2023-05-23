import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from './types/user.type';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@CurrentUser() user: UserType): Promise<string> {
    return user.accountType;
  }
}
