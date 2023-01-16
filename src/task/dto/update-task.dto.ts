import { PartialType } from '@nestjs/mapped-types/dist';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
