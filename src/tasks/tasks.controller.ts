import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindAllTasksDto } from './dto/find-all-tasks-dto';
import { TaskResponse } from './responses/task.response';
import { PaginatedTaskResponse } from './responses/paginated-task.response';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: TaskResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'Task with this title already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Task with title: Example already exists',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error creating task',
        error: 'Internal Server Error',
      },
    },
  })
  @Auth()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination and filters' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search in title and description',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Boolean,
    description: 'Filter by status',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Sort field (default: createdAt)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order (default: desc)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return tasks list with pagination',
    type: PaginatedTaskResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error retrieving tasks',
        error: 'Internal Server Error',
      },
    },
  })
  @Auth()
  findAll(@Query() findAllTasksDto: FindAllTasksDto) {
    return this.tasksService.findAll(findAllTasksDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the task',
    type: TaskResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task with id: 123 not found',
        error: 'Not Found',
      },
    },
  })
  @Auth()
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Title must be unique',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Auth()
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    schema: {
      example: 'Task with id: 123 deleted',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task with id: 123 not found',
        error: 'Not Found',
      },
    },
  })
  @Auth()
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
