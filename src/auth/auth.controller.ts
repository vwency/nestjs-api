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
import { Tokens } from './types'
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators'
import { AtGuard, RtGuard } from './guards'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { LocalGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<any> {
    return await this.authService.signupLocal(dto)
  }

  @ApiTags('Auth')
  @Post('signin')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Req() req: Request): Promise<any> {
    return req.user
  }

  @Get('status')
  @UseGuards(AtGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method')
    console.log(req.user)
    return req.user
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return await this.authService.logout(userId)
  }

  @ApiTags('Auth')
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, refreshToken)
  }
}
