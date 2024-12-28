import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BodyDtoUpdateComment {
  @ApiProperty()
  @IsString()
  comment_name: string

  @ApiProperty()
  @IsString()
  description: string
}
