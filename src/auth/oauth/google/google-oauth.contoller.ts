import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './utils/google.guard'
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('auth')
export class OAuthController {
  constructor() {}

  @ApiTags('OAuth2-google')
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' }
  }

  @ApiTags('OAuth2-google')
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('status', 302)
  handleRedirect() {
    return { msg: 'OK' }
  }

  @ApiTags('OAuth2-google')
  @ApiBearerAuth()
  @Get('google/status')
  user(@Req() request: Request) {
    console.log(request.user)
    if (request.user) {
      return { msg: 'Authenticated' }
    } else {
      return { msg: 'Not Authenticated' }
    }
  }
}
