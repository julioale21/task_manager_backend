import { validate } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

describe('CreateTaskDto', () => {
  it('should validate a valid DTO', async () => {
    const dto = new CreateTaskDto();
    dto.title = 'Valid Title';
    dto.description = 'Valid Description';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for an invalid DTO', async () => {
    const dto = new CreateTaskDto();
    dto.title = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
