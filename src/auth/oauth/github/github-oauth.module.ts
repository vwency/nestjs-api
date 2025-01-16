import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GithubOAuthService } from './utils/github-oauth.service'
import { GithubOAuthController } from './utils/github-oauth.contoller'
import { ConfigModule } from '@nestjs/config'
import { GithubOauthStrategy } from './utils/github-oauth.strategy'
import { SessionSerializer } from 'src/auth/serializer/Serializer'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
    ConfigModule,
  ],

  controllers: [GithubOAuthController],
  providers: [GithubOAuthService, GithubOauthStrategy, SessionSerializer],
})
export class GithubOAuthModule {}
