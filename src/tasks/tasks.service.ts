import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const existingTask = await this.taskModel
        .findOne({
          title: { $regex: new RegExp(`^${createTaskDto.title}$`, 'i') },
        })
        .exec();

      if (existingTask) {
        throw new ConflictException(
          `Task with title: ${createTaskDto.title} already exists`,
        );
      }

      const createdTask = new this.taskModel(createTaskDto);
      return await createdTask.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Task with title: ${createTaskDto.title} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const query = this.taskModel.find();

      return await query.sort({ createdAt: -1 }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return `Task with id: ${id} deleted`;
  }
}
