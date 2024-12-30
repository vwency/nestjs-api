import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from 'src/auth/auth.service'

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

    const username = profile.name.givenName + ' ' + profile.name.familyName // Combining givenName and familyName for the username

    // Extract email
    const email = profile.emails[0].value
    // const username = '';
    // const email = '';
    const password = ''

    const user = await this.authservice.ValidateOAuthUser({
      username,
      password,
      email,
    })
    return user
  }
}
