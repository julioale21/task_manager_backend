import { FindAllTasksDto } from './dto/find-all-tasks-dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(findAllTasksDto: FindAllTasksDto) {
    try {
      const { page, limit, search, status, sortBy, sortOrder } = {
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc' as const,
        ...findAllTasksDto,
      };

      const filter: any = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      if (status !== undefined) {
        filter.status = status;
      }

      const total = await this.taskModel.countDocuments(filter);
      const totalPages = Math.ceil(total / limit);

      // Si la página solicitada excede el total de páginas, devolver array vacío
      if (page > totalPages && total > 0) {
        return {
          data: [],
          pagination: {
            total,
            page, // Mantenemos la página solicitada
            totalPages,
            limit,
            hasNextPage: false,
            hasPrevPage: page > 1,
          },
          filter: {
            search,
            status,
          },
        };
      }

      const skip = (page - 1) * limit;
      const tasks = await this.taskModel
        .find(filter)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        data: tasks,
        pagination: {
          total,
          page,
          totalPages,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filter: {
          search,
          status,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving tasks');
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
    try {
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
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Title must be unique');
      }

      throw new InternalServerErrorException('Error updating task');
    }
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return `Task with id: ${id} deleted`;
  }
}
