import { ApiProperty } from '@nestjs/swagger';
import { TaskResponse } from './task.response';

export class PaginatedTaskResponse {
  @ApiProperty({
    type: [TaskResponse],
    description: 'Array of tasks',
  })
  data: TaskResponse[];

  @ApiProperty({
    description: 'Pagination details',
    example: {
      total: 100,
      page: 1,
      totalPages: 10,
      limit: 10,
      hasNextPage: true,
      hasPrevPage: false,
    },
  })
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };

  @ApiProperty({
    description: 'Applied filters',
    example: {
      search: 'documentation',
      status: true,
    },
  })
  filter: {
    search: string;
    status: boolean;
  };
}
