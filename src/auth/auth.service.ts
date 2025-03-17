import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { EmailService } from 'src/common/email.service';
import { UserService } from 'src/user/user.service';
import { randomInt } from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    async signIn(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new NotFoundException();

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) throw new UnauthorizedException();

        const payload = { sub: user._id };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token };
    }

    async forgotPassword(email: string) {
        const user = this.userService.findOne(email);
        if (!user) throw new NotFoundException('User not found for that email');

        const otp = `${randomInt(10_000, 100_000)}`;
        const emailSent = await this.emailService.sendPasswordResetMail(email, otp);

        if(!emailSent) throw new InternalServerErrorException("Error sending email");
    }
}
