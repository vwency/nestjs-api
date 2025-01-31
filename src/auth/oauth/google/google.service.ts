// google-oAuth.service.ts
import { Injectable } from '@nestjs/common'
import { OAuthService } from '../oauth.service'
import { AuthService } from 'src/auth/auth/auth.service'
import { Request } from 'express'
import { AuthDto } from 'src/auth/auth/dto'

@Injectable()
export class GoogleOAuthService {
  private readonly GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
  private readonly GOOGLE_PROFILE_URL =
    'https://www.googleapis.com/oauth2/v2/userinfo'

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly authService: AuthService,
  ) {}

  async authenticate(code: string, req: Request): Promise<any> {
    const tokenData = await this.oAuthService.getToken(this.GOOGLE_TOKEN_URL, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    })

    const accessToken = tokenData.access_token
    const profile = await this.oAuthService.getProfile(
      this.GOOGLE_PROFILE_URL,
      accessToken,
    )

    const user = await this.ExtractData(profile)

    return this.authService.ValidateOAuthUser(user, req)
  }

  private async ExtractData(profile: any): Promise<AuthDto> {
    const user = {
      username:
        `${profile.given_name || ''} ${profile.family_name || ''}`.trim(),
      email: profile.email,
      password: '',
    }
    return user
  }
}
