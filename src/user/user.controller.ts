import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('users')
export class UserController {

    constructor(private readonly user_service: UserService) { }

    @Get('me')
    @HttpCode(200)
    async profileInfo(@Headers('x-user') user_header: UserHeader) {
        const userId = user_header.sub;
        const user = await this.user_service.profileInfo(userId);

        const { password, ...userObj } = user;
        return { profile_info: userObj };

    }

    @Get('my-cart')
    @HttpCode(200)
    async getAllItemsInCart(@Headers('x-user') user_header: UserHeader) {
        const userId = user_header.sub;
        const userCart = await this.user_service.getAllItemsInCart(userId);
        return { cart: userCart }
    }
}
