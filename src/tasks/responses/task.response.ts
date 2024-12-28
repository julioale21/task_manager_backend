import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({
    description: 'Task unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Write detailed documentation for the API endpoints',
  })
  description: string;

  @ApiProperty({
    description: 'Task status',
    example: false,
  })
  status: boolean;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-12-28T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-12-28T10:00:00.000Z',
  })
  updatedAt: Date;
}
