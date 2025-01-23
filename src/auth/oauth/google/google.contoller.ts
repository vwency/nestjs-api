import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { GoogleOAuthService } from './google.service'

@ApiTags('OAuth2-google')
@Controller('auth')
export class OAuthController {
  constructor(private readonly googleService: GoogleOAuthService) {}

  @ApiTags('OAuth2-google')
  @ApiOperation({ summary: 'Google login' })
  @Get('google/login')
  async handleLogin(@Res() res: Response) {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
    })

    const googleLoginUrl = `${baseUrl}?${params.toString()}`
    return res.redirect(googleLoginUrl)
  }

  @ApiTags('OAuth2-google')
  @ApiOperation({ summary: 'Google redirect url' })
  @Get('google/redirect')
  async handleRedirect(
    @Query('code') code: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      await this.googleService.authenticate(code, req)
      return res.redirect('/auth/status')
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
