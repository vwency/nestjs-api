import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GithubOAuthService } from './github.service'
import { GithubController } from './github.contoller'
import { AuthService } from 'src/auth/auth/auth.service'
import { OAuthService } from '../oauth.service'

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [GithubController],
  providers: [GithubOAuthService, AuthService, OAuthService],
})
export class GithubOAuthModule {}
