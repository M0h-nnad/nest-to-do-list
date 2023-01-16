import { Controller, Get } from '@nestjs/common';

@Controller('/user')
export class UserController {
  @Get('/')
  user() {
    console.log(process.env.DATABASE_URI);
  }
}
