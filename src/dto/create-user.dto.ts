import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
