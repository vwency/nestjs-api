import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BodyDtoCreateColumn {
  @ApiProperty()
  @IsString()
  column_name: string

  @ApiProperty()
  @IsString()
  description: string
}
