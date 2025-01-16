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
}
