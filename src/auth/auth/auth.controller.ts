import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { AtGuard } from './guards'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { LocalGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<any> {
    return await this.authService.signupLocal(dto)
  }

  @ApiTags('Auth')
  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Req() req: Request): Promise<any> {
    return req.user
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @Get('status')
  @UseGuards(AtGuard)
  async status(@Req() req: Request) {
    console.log('Inside AuthController status method')
    console.log(req.user)
    return req.user
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @Get('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request): Promise<boolean> {
    return await this.authService.logout(req)
  }
}
