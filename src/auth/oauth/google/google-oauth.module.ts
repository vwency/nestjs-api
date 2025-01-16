import { Module } from '@nestjs/common'
import { GoogleStrategy } from './utils/google.strategy'
import { SessionSerializer } from '../../serializer/Serializer'
import { OAuthController } from './google-oauth.contoller'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth/auth.service'
import { GoogleProfileService } from './utils/google.service'

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [OAuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    AuthService,
    GoogleProfileService,
  ],
})
export class GoogleOAuthModule {}
