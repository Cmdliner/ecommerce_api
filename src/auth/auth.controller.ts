import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from 'src/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {

    constructor(private userService: UserService, private authService: AuthService) { }

    @Post('register')
    @HttpCode(201)
    async register(@Body() body: CreateUserDto) {
        try {
            const user = await this.userService.createUser(body.email, body.password);
            return { success: true, user };
        } catch (error) {
            console.error(error);
        }
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        try {
            const { access_token } = await this.authService.signIn(body.email, body.password);
            return { success: true, access_token }
        } catch (error) {
            console.error(error);
        }
    }
}
