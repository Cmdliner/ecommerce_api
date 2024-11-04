export class CreateUserDto {
  email: string;
  password: string;
}

export class UserLoginDto extends CreateUserDto {}
