import { Controller, Get, Param, UseGuards, Put, Body } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { Payload } from 'src/auth/dercorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from './dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Param() params) {
    const limit = params.limit || 10;
    const page = params.page || 1;
    const users = await this.userService.findAll(limit, page);
    return users;
  }

  @Get('user')
  async getUser(@Payload('') payload) {
    const _id = payload.id;
    return this.userService.find(_id);
  }

  @Put('user')
  async updateUser(@Payload() payload, @Body() updateUserDto: UpdateUserDto) {
    const id = payload.id;

    const existingUser = await this.userService.update(id, updateUserDto);

    return existingUser;
  }

  @Delete('user')
  async deleteUser(@Payload() Payload) {
    const id = Payload.id;

    await this.userService.delete(id);

    return;
  }
}
