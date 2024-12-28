import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindAllTasksDto } from './dto/find-all-tasks-dto';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel: any;

  beforeEach(async () => {
    mockTaskModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({
        _id: 'mock-id',
        title: dto.title,
        description: dto.description,
        status: dto.status,
        createdAt: new Date(),
      }),
    }));

    mockTaskModel.findOne = jest.fn();
    mockTaskModel.find = jest.fn();
    mockTaskModel.findById = jest.fn();
    mockTaskModel.findByIdAndUpdate = jest.fn();
    mockTaskModel.findByIdAndDelete = jest.fn();
    mockTaskModel.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should create a task when the title is unique', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Unique Task Title',
      description: 'A description',
      status: false,
    };

    const mockCreatedTask = {
      _id: 'mock-id',
      ...createTaskDto,
      createdAt: new Date(),
    };

    // Mock para findOne
    mockTaskModel.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    // Mock para save
    mockTaskModel.mockImplementationOnce(() => ({
      ...createTaskDto,
      save: jest.fn().mockResolvedValueOnce(mockCreatedTask),
    }));

    const result = await service.create(createTaskDto);

    expect(result).toEqual(
      expect.objectContaining({
        _id: 'mock-id',
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
      }),
    );

    expect(mockTaskModel.findOne).toHaveBeenCalledWith({
      title: { $regex: /^Unique Task Title$/i },
    });
  });

  describe('findAll', () => {
    it('should return all tasks with pagination and filters', async () => {
      const findAllTasksDto: FindAllTasksDto = {
        page: 1,
        limit: 10,
        search: 'documentation',
        status: false,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };

      const tasks = [
        { title: 'Task 1', description: 'Description 1', status: false },
        { title: 'Task 2', description: 'Description 2', status: false },
      ];

      mockTaskModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(tasks),
      });

      mockTaskModel.countDocuments.mockResolvedValue(2);

      const result = await service.findAll(findAllTasksDto);

      expect(result).toEqual({
        data: tasks,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
        filter: {
          search: 'documentation',
          status: false,
        },
      });
    });

    it('should return all tasks with default values', async () => {
      const findAllTasksDto: FindAllTasksDto = {};

      const tasks = [
        { title: 'Task 1', description: 'Description 1', status: false },
        { title: 'Task 2', description: 'Description 2', status: true },
      ];

      mockTaskModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(tasks),
      });

      mockTaskModel.countDocuments.mockResolvedValue(2);

      const result = await service.findAll(findAllTasksDto);

      expect(result).toEqual({
        data: tasks,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
        filter: {
          search: '',
          status: undefined,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const task = {
        title: 'Task 1',
        description: 'Description 1',
        status: false,
      };
      const taskId = 'a-valid-id';

      mockTaskModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(task),
      });

      const result = await service.findOne(taskId);
      expect(result).toEqual(task);
      expect(mockTaskModel.findById).toHaveBeenCalledWith(taskId);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 'a-valid-id';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated description',
        status: true,
      };
      const updatedTask = { ...updateTaskDto, _id: taskId };

      mockTaskModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedTask),
      });

      const result = await service.update(taskId, updateTaskDto);
      expect(result).toEqual(updatedTask);
      expect(mockTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
        taskId,
        updateTaskDto,
        { new: true, runValidators: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const taskId = 'a-valid-id';
      const expectedResult = `Task with id: ${taskId} deleted`;

      mockTaskModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      const result = await service.remove(taskId);
      expect(result).toEqual(expectedResult);
      expect(mockTaskModel.findByIdAndDelete).toHaveBeenCalledWith(taskId);
    });
  });
});
