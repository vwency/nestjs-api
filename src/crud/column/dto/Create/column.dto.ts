import { IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DtoCreateColumn {
  @IsOptional()
  user_id: string

  @ApiProperty()
  @IsString()
  column_name: string

  @ApiProperty()
  @IsString()
  description: string
}
