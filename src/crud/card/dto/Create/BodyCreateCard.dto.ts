import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BodyDtoCreateCard {
  @ApiProperty()
  @IsString()
  card_name: string

  @ApiProperty()
  @IsString()
  description: string
}
