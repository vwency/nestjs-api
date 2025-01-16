import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { Injectable } from '@nestjs/common'
import { GithubOAuthService } from './github.service'
import { AuthService } from 'src/auth/auth/auth.service'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private githubProfileService: GithubOAuthService,
    private authservice: AuthService,
  ) {
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
    const { username, email, password } =
      this.githubProfileService.extractUserData(profile)

    const user = await this.authservice.ValidateOAuthUser({
      username,
      email,
      password,
    })

    return user
  }
}
