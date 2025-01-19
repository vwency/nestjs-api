import {
  Controller,
  Get,
  Query,
  Redirect,
  Res,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common'
import { GithubOAuthService } from './github.service'
import { AuthService } from 'src/auth/auth/auth.service'
import { Request } from 'express'

@Controller('auth')
export class GithubOAuthController {
  constructor(
    private readonly githubOAuthService: GithubOAuthService,
    private readonly authService: AuthService,
  ) {}

  @Get('github')
  @Redirect('https://github.com/login/oauth/authorize', 302)
  githubLogin() {
    const clientId = process.env.GITHUB_CLIENT_ID
    const redirectUri = process.env.GITHUB_CALLBACK_URL

    return {
      url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`,
    }
  }

  @Get('github/callback')
  async githubCallback(
    @Query('code') code: string,
    @Res() res,
    @Req() req: Request,
  ) {
    try {
      if (!code) {
        throw new HttpException(
          'Authorization code not provided',
          HttpStatus.BAD_REQUEST,
        )
      }

      const { user } = await this.githubOAuthService.authenticateWithGithub(
        code,
        req,
      )

      return res.json({
        message: 'Authentication successful',
        user,
      })
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
