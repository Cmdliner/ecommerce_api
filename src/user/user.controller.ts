import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { Types } from 'mongoose';


@Controller('users')
export class UserController {

  constructor(private readonly user_service: UserService) { }

  @Get('me')
  profileInfo(@Headers('x-user') user_header: UserHeader) {
    const userId = user_header.sub;
    return this.user_service.profileInfo(userId);
  }
}
