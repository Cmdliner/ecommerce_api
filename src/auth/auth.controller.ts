import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    
    constructor(private userService: UserService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() body: CreateUserDto) {
        try {
            const user = await this.userService.createUser(body.email, body.password);
            return { success: true, user };
        } catch (error) {
            
        }
    }
}
