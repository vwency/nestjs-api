import { Module } from '@nestjs/common'
import { GithubOAuthService } from './github.service'
import { GithubController } from './github.contoller'
import { AuthService } from 'src/auth/auth/auth.service'
import { OAuthService } from '../oauth.service'

@Module({
  imports: [],
  controllers: [GithubController],
  providers: [GithubOAuthService, AuthService, OAuthService],
})
export class GithubOAuthModule {}
