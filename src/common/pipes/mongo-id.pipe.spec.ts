import { MongoIdPipe } from './mongo-id.pipe';
import { BadRequestException } from '@nestjs/common';

describe('MongoIdPipe', () => {
  let pipe: MongoIdPipe;

  beforeEach(() => {
    pipe = new MongoIdPipe();
  });

  it('should validate a valid MongoDB ObjectId', () => {
    const validId = '60b8d6ee8ed8b70c8c8a4f36';
    expect(pipe.transform(validId)).toBe(validId);
  });

  it('should throw BadRequestException for an invalid MongoDB ObjectId', () => {
    const invalidId = 'invalid-id';
    expect(() => pipe.transform(invalidId)).toThrow(BadRequestException);
  });
});
