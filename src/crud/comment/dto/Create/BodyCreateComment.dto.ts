import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BodyDtoCreateComment {
  @ApiProperty()
  @IsString()
  comment_name: string

  @ApiProperty()
  @IsString()
  description: string
}
