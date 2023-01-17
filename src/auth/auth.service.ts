import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../auth/dto';
import { CreateUserDto } from '../user/dto';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { MongoServerError } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const password = await argon.hash(createUserDto.password);

      createUserDto.password = password;

      return await this.userService.create(createUserDto);
    } catch (e) {
      if (e instanceof MongoServerError) {
        if (e.code === 11000) {
          throw new BadRequestException('User Already ');
        }
      }
    }
  }

  async login(authDto: AuthDto) {
    const existingUser = await this.userService.findByEmail(authDto.email);

    if (!existingUser) throw new ForbiddenException(`Invalid Creditionals`);

    const isMatch = await argon.verify(existingUser.password, authDto.password);

    if (!isMatch) throw new ForbiddenException('Invalid Creditionals');

    const token = await this.jwtService.sign({
      email: existingUser.email,
      id: existingUser._id,
    });

    return { token };
  }

  async test() {
    try {
      const users = await this.userService.findAll(1, 10);
      return users;
    } catch (e) {
      return e;
    }
  }
}
