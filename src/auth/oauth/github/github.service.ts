import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { OAuthService } from '../oauth.service'
import { AuthService } from 'src/auth/auth/auth.service'
import { Request } from 'express'
import { AuthDto } from 'src/auth/auth/dto'

@Injectable()
export class GithubOAuthService {
  constructor(
    private oauthService: OAuthService,
    private authservice: AuthService,
  ) {}

  private readonly GITHUB_TOKEN_URL =
    'https://github.com/login/oauth/access_token'
  private readonly GITHUB_USER_URL = 'https://api.github.com/user'
  private readonly GITHUB_EMAILS_URL = 'https://api.github.com/user/emails'

  async authenticate(code: string, req: Request): Promise<any> {
    try {
      const tokenResponse = await this.oauthService.getToken(
        this.GITHUB_TOKEN_URL,
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
      )

      const accessToken = tokenResponse.access_token

      const user = await this.getUserData(accessToken)

      return this.authservice.ValidateOAuthUser(user, req)
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private async getUserData(accessToken: string): Promise<AuthDto> {
    const userResponse = await this.oauthService.getProfile(
      this.GITHUB_USER_URL,
      accessToken,
    )

    let email = userResponse.email

    if (!email) {
      const emailsResponse = await this.oauthService.getProfile(
        this.GITHUB_EMAILS_URL,
        accessToken,
      )
      const primaryEmail = emailsResponse.find(
        (emailObj: any) => emailObj.primary && emailObj.verified,
      )
      email = primaryEmail?.email || null
    }

    const user = {
      username: userResponse.login,
      email,
      password: ' ',
    }

    return user
  }
}
