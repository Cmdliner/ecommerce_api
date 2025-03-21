import { BadRequestException, Body, Controller, Headers, HttpCode, Patch, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto, PasswordResetOtpDto, ResetPasswordDto, UserLoginDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        const user = await this.userService.createUser(body.email, body.username, body.password);
        const { password, ...userObj } = user.toObject();
        return userObj;
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        const { access_token } = await this.authService.signIn(
            body.email,
            body.password,
        );
        return { access_token };
    }

    @Post('forgot-password')
    @HttpCode(200)
    async forgotPassword(@Body('email') email: string) {
        this.authService.forgotPassword(email);
        return { success: true, message: "Reset token has been sent to email;" }
    }

    @Post('reset-password')
    @HttpCode(200)
    async verifyPasswordResetOtp(@Body() body: PasswordResetOtpDto) {
        const { access_token } = await this.authService.verifyResetPwdOtp(body.email, body.otp);
        return { message: 'OTP confirmed', access_token };
    }

    @Patch('reset-password')
    async resetPassword(@Body() body: ResetPasswordDto, @Headers('x-user') user_header: UserHeader) {
        const userId = user_header.sub;
        const _ = await this.authService.updatePassword(userId, body.password);
        return { message: 'Password updated'}
    }
}
