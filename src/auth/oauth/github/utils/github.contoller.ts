import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GithubOAuthService } from './github.service'
import { request, Request } from 'express'

@Controller('auth')
export class GithubOAuthController {
  constructor(private readonly authService: GithubOAuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin(): Promise<void> {}

  @Get('github/login')
  @UseGuards(AuthGuard('github'))
  handleLogin() {
    return { msg: 'Github Authentication' }
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req: Request): Promise<any> {
    return this.authService.getUserInfo(req.user)
  }

  @Get('github/profile')
  async getProfile(@Req() req: Request) {
    console.log(request.user)
    return req.user
  }
}
