import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../auth/dto';
import { User, userDocument } from '../schema/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    return await this.userModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async find(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<userDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} Is Not Found`);
    }

    return existingUser;
  }

  async delete(userId: string): Promise<User> {
    const existingUser = await this.userModel.findByIdAndDelete(userId);

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} Is Not Found`);
    }

    return existingUser;
  }
}
