import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from '../task/dto';
import { Task, taskDocument } from 'src/schema/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<taskDocument>,
  ) {}

  async findAll(limit: number, page: number): Promise<Task[]> {
    return await this.taskModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  async find(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async create(userId, createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await new this.taskModel({ userId, ...createTaskDto });
    return newTask.save();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      {
        new: true,
      },
    );

    if (!existingTask) throw new NotFoundException(`Task #${id} is not Found`);

    return existingTask;
  }

  async delete(id): Promise<Task> {
    const existingTask = await this.taskModel.findByIdAndDelete(id);

    if (!existingTask) throw new NotFoundException(`Task #${id} is not Found`);

    return existingTask;
  }

  async findUserTasks(userId) {
    const existingTask = await this.taskModel.find({ userId: userId }).exec();

    if (!existingTask) throw new NotFoundException(`Task  is not Found`);

    return existingTask;
  }
}
