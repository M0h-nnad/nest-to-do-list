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
            fileType: 'image/jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Payload() payload,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    console.log(file);

    const task = await this.taskService.create(payload.id, createTaskDto);

    return task;
  }

  @Put(':id')
  async updateTask(@Param('id') id, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.update(id, updateTaskDto);

    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const task = await this.taskService.delete(id);

    return task;
  }
}
