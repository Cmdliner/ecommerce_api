import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from 'src/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('register')
    @HttpCode(201)
    async register(@Body() body: CreateUserDto) {
        console.log({ body });
        const user = await this.userService.createUser(body.email, body.username, body.password);
        const { password, ...userObj } = user.toJSON();
        return userObj;
    }

    @Post('login')
    async login(@Body() body: UserLoginDto) {
        const { access_token } = await this.authService.signIn(
            body.email,
            body.password,
        );
        return { access_token };
    }

    @Post('forgot-password')
    async forgotPassword(@Body("email") email: string) {
        this.authService.forgotPassword(email);
        return { success: true, message: "Reset token has been sent to email;" }
    }
}
