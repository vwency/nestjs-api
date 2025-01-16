import { Injectable } from '@nestjs/common'

@Injectable()
export class GithubOAuthService {
  async getUserInfo(user: any): Promise<any> {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  }
  extractUserData(profile: any): {
    id: string
    username: string
    email: string
    password: string
  } {
    const { id, _json, emails } = profile

    const username = _json?.login || 'Unknown'

    const password = ''

    const email = emails?.[0]?.value || null

    return {
      id: String(id),
      username,
      password,
      email,
    }
  }
}
