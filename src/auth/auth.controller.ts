import { Controller } from '@nestjs/common';
import { Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('signup')
  async signup(@Body() createUserDtoo: CreateUserDto) {
    return this.authService.signUp(createUserDtoo);
  }

  @Get()
  async getAll() {
    return this.authService.test();
  }
}
