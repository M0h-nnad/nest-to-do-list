import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MaxLength(40)
  title: string;
  @IsNotEmpty()
  @MaxLength(100)
  content: string;

  @IsNotEmpty()
  userId: string;
  imgRef: string;
}
