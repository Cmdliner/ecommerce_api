import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new NotFoundException();

        const passwordsMatch = await compare(password, user.password); UnauthorizedException
        if (!passwordsMatch) throw new UnauthorizedException();

        const payload = { sub: user._id };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token }
    }
}
