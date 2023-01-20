import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { Payload } from 'src/auth/dercorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(JwtGuard)
export class TaskConrtoller {
  constructor(private taskService: TaskService) {}

  @Get()
  async getUserTasks(@Payload() payload) {
    const task = await this.taskService.findUserTasks(payload.id);

    return task;
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return await this.taskService.find(id);
  }

  @UseInterceptors(FileInterceptor('img'))
  @Post()
  async createTask(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Payload() payload,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    createTaskDto.imgRef = file.path;

    const task = await this.taskService.create(payload.id, createTaskDto);

    return task;
  }

  @UseInterceptors(FileInterceptor('img'))
  @Put(':id')
  async updateTask(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (file) {
      updateTaskDto.imgRef = file.path;
    }
    const task = await this.taskService.update(id, updateTaskDto);

    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const task = await this.taskService.delete(id);
    unlinkSync(join(process.cwd(), 'img', task.imgRef));
    return task;
  }
}
