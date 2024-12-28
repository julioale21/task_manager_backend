import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindAllTasksDto } from './dto/find-all-tasks-dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the create method of the service', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: false,
      };

      const result = { id: '1', ...createTaskDto };
      mockTaskService.create.mockResolvedValue(result);

      expect(await controller.create(createTaskDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should call the findAll method of the service', async () => {
      const findAllTasksDto: FindAllTasksDto = {};
      const result = { data: [], pagination: {} };

      mockTaskService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(findAllTasksDto)).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(findAllTasksDto);
    });
  });

  describe('findOne', () => {
    it('should call the findOne method of the service', async () => {
      const id = '1';
      const result = {
        id,
        title: 'Test Task',
        description: 'Test Description',
        status: false,
      };

      mockTaskService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call the update method of the service', async () => {
      const id = '1';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: true,
      };

      const result = { id, ...updateTaskDto };
      mockTaskService.update.mockResolvedValue(result);

      expect(await controller.update(id, updateTaskDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should call the remove method of the service', async () => {
      const id = '1';
      const result = `Task with id: ${id} deleted`;

      mockTaskService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
