import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { v4 as uuidv4 } from 'uuid'
import { Expose } from 'class-transformer'

export class ParamDtoCreateComment {
  @Expose()
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  user_id: uuidv4

  @ApiProperty()
  @IsString()
  column_name: string

  @ApiProperty()
  @IsString()
  card_name: string
}
