import { Module } from '@nestjs/common'
import { GoogleStrategy } from './utils/GoogleStrategy'
import { SessionSerializer } from './utils/Serializer'
import { OAuthController } from './google-oauth.contoller'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [OAuthController],
  providers: [GoogleStrategy, SessionSerializer],
})
export class GoogleOAuthModule {}
