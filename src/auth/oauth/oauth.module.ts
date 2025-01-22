import { Module } from '@nestjs/common'
import { GoogleOAuthModule } from './google/google-oauth.module'
import { GithubOAuthModule } from './github/github-oauth.module'

@Module({
  controllers: [],
  providers: [],
  imports: [GoogleOAuthModule, GithubOAuthModule],
})
export class OAuthModule {}
