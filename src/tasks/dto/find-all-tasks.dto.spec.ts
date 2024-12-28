import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FindAllTasksDto } from './find-all-tasks-dto';

describe('FindAllTasksDto', () => {
  it('should validate a valid DTO', async () => {
    const dto = {
      page: 1,
      limit: 10,
      search: 'documentation',
      status: true,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    const instance = plainToInstance(FindAllTasksDto, dto);
    const errors = await validate(instance);

    expect(errors.length).toBe(0);
  });

  it('should fail validation for invalid page and limit', async () => {
    const dto = {
      page: 0,
      limit: -5,
    };

    const instance = plainToInstance(FindAllTasksDto, dto);
    const errors = await validate(instance);

    expect(errors.length).toBeGreaterThan(0);

    const pageError = errors.find((error) => error.property === 'page');
    const limitError = errors.find((error) => error.property === 'limit');

    expect(pageError).toBeDefined();
    expect(pageError?.constraints?.min).toBe('page must not be less than 1');

    expect(limitError).toBeDefined();
    expect(limitError?.constraints?.min).toBe('limit must not be less than 1');
  });

  it('should fail validation for invalid sortOrder', async () => {
    const dto = {
      sortOrder: 'ascending',
    };

    const instance = plainToInstance(FindAllTasksDto, dto);
    const errors = await validate(instance);

    expect(errors.length).toBeGreaterThan(0);

    const sortOrderError = errors.find(
      (error) => error.property === 'sortOrder',
    );
    expect(sortOrderError).toBeDefined();
    expect(sortOrderError?.constraints?.isEnum).toBeDefined();
  });

  it('should apply transformations', async () => {
    const dto = {
      page: '2',
      limit: '20',
      status: 'true',
    };

    const instance = plainToInstance(FindAllTasksDto, dto);
    expect(instance.page).toBe(2);
    expect(instance.limit).toBe(20);
    expect(instance.status).toBe(true);
  });
});
