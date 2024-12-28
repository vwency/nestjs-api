import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { v4 as uuidv4 } from 'uuid'
import { Expose } from 'class-transformer'

export class ParamDtoCreateCard {
  @Expose()
  @ApiProperty()
  @IsString()
  column_name: string

  @Expose()
  @IsOptional()
  @IsUUID()
  user_id: uuidv4
}
