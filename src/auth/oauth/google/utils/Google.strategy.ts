import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from 'src/auth/auth/auth.service'
import { GoogleProfileService } from './Google.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authservice: AuthService,
    private googleProfileService: GoogleProfileService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['profile', 'email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)

    const { username, email, password } =
      this.googleProfileService.extractUserData(profile)

    const user = await this.authservice.ValidateOAuthUser({
      username,
      password,
      email,
    })

    return user
  }
}
