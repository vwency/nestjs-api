import { Injectable } from '@nestjs/common'
import { Profile } from 'passport-google-oauth20'

@Injectable()
export class GoogleProfileService {
  extractUserData(profile: Profile) {
    const firstName = profile.name?.givenName || ''
    const lastName = profile.name?.familyName || ''
    const username = `${firstName} ${lastName}`.trim()
    const email = profile.emails?.[0]?.value || ''
    const password = ''

    return { username, email, password }
  }
}
