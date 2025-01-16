import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { id, username, emails } = profile
    return {
      id,
      username,
      email: emails?.[0]?.value,
      accessToken,
    }
  }
}
