import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GithubOAuthService } from './github-oauth.service'

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
  async githubCallback(@Req() req: any): Promise<any> {
    return this.authService.getUserInfo(req.user)
  }
}
