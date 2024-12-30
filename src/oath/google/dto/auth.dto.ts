import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}
