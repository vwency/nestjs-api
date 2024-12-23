import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BodyDtoColumn {
  @ApiProperty()
  @IsString()
  column_name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
