import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { EmailService } from 'src/common/email.service';
import { UserService } from 'src/user/user.service';
import { randomInt } from "crypto";
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    private async generateAccessToken(user_id: Types.ObjectId) {
        const payload = { sub: user_id };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token }

    }

    async signIn(email: string, password: string) {
        const user = await this.userService.findOne(email);

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) throw new UnauthorizedException();

        const { access_token } = await this.generateAccessToken(user._id);
        return { access_token };
    }

    async forgotPassword(email: string) {
        const user = this.userService.findOne(email);
        const otp = `${randomInt(10_000, 100_000)}`;

        const emailSent = await this.emailService.sendPasswordResetMail(email, otp);

        if (!emailSent) throw new InternalServerErrorException("Error sending email");
    }

    async verifyResetPwdOtp(email: string, otp: string) {
        const user = await this.userService.findOne(email);
        if (!user.reset_pwd_otp || user.reset_pwd_otp !== otp) {
            throw new BadRequestException('Invalid otp');
        }
        return this.generateAccessToken(user._id);
    }

    async updatePassword(user_id: Types.ObjectId, password: string) {
        const user = await this.userService.findById(user_id);

        user.password = await hash(password, 10);
        await user.save();
        return user;
    }
}
