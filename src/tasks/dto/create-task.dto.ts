import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project documentation',
    description: 'The title of the task',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The description of the task',
    example: 'Write detailed documentation for the API endpoints',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The status of the task',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsString()
  status?: boolean;
}
