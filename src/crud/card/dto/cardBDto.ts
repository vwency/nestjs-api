import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ParamBDtoCard {
  @Expose()
  user_id: string;

  @Expose()
  @IsOptional()
  @IsUUID()
  column_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  card_name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
