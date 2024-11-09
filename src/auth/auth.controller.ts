import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from 'src/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('register')
    @HttpCode(201)
    async register(@Body() body: CreateUserDto) {
        const user = await this.userService.createUser(body.email, body.username, body.password);
        return { success: true, user };
    }

    @Post('login')
    async login(@Body() body: UserLoginDto) {
        const { access_token } = await this.authService.signIn(
            body.email,
            body.password,
        );
        return { success: true, access_token };
    }

    @Post('forgot-password')
    async forgotPassword(@Body("email") email: string) {
        this.authService.forgotPassword(email);
        return { success: true, message: "Reset token has been sent to email;" }
    }
}
