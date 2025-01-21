import { Controller, Get, Query, Req, Res } from '@nestjs/common'
import { GithubOAuthService } from './github.service'
import { Request, Response } from 'express'

@Controller('auth/github')
export class GithubController {
  constructor(private readonly githubOAuthService: GithubOAuthService) {}

  @Get('login')
  githubLogin(@Res() res: Response) {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=user:email`
    return res.redirect(url)
  }

  @Get('callback')
  async githubCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.githubOAuthService.authenticate(code, req)
      return res.json(user)
    } catch (error) {
      console.error('GitHub OAuth callback error:', error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}
