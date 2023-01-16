import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUsers(@Param() params, @Res() res) {
    try {
      const limit = params.limit || 10;
      const page = params.page || 1;
      const newUser = await this.userService.findAll(limit, page);
    } catch (e) {}
  }
}
