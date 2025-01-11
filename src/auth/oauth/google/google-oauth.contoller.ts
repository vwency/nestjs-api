import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './utils/Guards'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'

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
