import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { AuthDto } from './dto';
import { JwtGuard } from './guard';
import { User } from './dercorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('signup')
  async signup(@Body() createUserDtoo: CreateUserDto) {
    return this.authService.signUp(createUserDtoo);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAll() {
    return this.authService.test();
  }
}
