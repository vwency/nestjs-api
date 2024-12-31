import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from 'src/auth/auth/auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
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

    const firstName = profile.name?.givenName || ''
    const lastName = profile.name?.familyName || ''
    const username = `${firstName} ${lastName}`.trim()
    const password = ''
    const email = profile.emails?.[0]?.value
    const user = await this.authservice.ValidateOAuthUser({
      username,
      password,
      email,
    })
    return user
  }
}
