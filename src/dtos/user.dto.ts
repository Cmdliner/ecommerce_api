export class CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export class UserLoginDto {
  username?: string;
  email?: string;
  password: string;
}
