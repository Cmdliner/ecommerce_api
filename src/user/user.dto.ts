import { IsAscii, IsDefined, IsEmail, IsNumberString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsAscii()
    username: string;

    @IsStrongPassword()
    @IsDefined()
    password: string;
}

export class UserLoginDto {
    @IsEmail()
    email: string;

    @IsDefined()
    @MinLength(6)
    password: string;
}

export class PasswordResetOtpDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    otp: string;
}

export class ResetPasswordDto extends UserLoginDto {}