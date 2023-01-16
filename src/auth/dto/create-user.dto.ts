import { IsNotEmpty, MaxLength, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
  @IsEmail()
  email: string;
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be 8 chars , at least one special char and uppercase char',
    },
  )
  @IsNotEmpty()
  password: string;
}
