import { Module } from '@nestjs/common'
import { GoogleOAuthModule } from './google/google-oauth.module'

@Module({
  controllers: [],
  providers: [],
  imports: [GoogleOAuthModule],
})
export class OAuthModule {}
