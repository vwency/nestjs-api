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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto, @Req() req: Request): Promise<any> {
    return await this.authService.signupLocal(dto, req)
  }

  @ApiTags('Auth')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto, @Req() req: Request): Promise<any> {
    return await this.authService.signinLocal(dto, req)
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @Get('status')
  @UseGuards(AtGuard)
  async status(@Req() req: Request) {
    return req.session.user
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
