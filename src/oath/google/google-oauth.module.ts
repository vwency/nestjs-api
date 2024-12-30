import { Module } from '@nestjs/common'
import { GoogleStrategy } from './utils/GoogleStrategy'
import { SessionSerializer } from './utils/Serializer'
import { OAuthController } from './google-oauth.contoller'

@Module({
  imports: [],
  controllers: [OAuthController],
  providers: [GoogleStrategy, SessionSerializer],
})
export class GoogleOAuthModule {}
