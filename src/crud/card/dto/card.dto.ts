import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class CardDto {
  @ApiProperty()
  @IsString()
  column_name: string;

  @IsUUID()
  user_id: uuidv4;

  @IsOptional()
  @IsUUID()
  column_id: string;

  @ApiProperty()
  @IsString()
  card_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
