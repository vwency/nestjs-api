import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './utils/Guards'
import { Request } from 'express'

@Controller('auth')
export class OAuthController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' }
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('status', 302)
  handleRedirect() {
    return { msg: 'OK' }
  }

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
