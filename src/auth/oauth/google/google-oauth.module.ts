import { Module } from '@nestjs/common'
import { OAuthController } from './google.contoller'
import { AuthService } from 'src/auth/auth/auth.service'
import { GoogleOAuthService } from './google.service'
import { OAuthService } from '../oauth.service'

@Module({
  imports: [],
  controllers: [OAuthController],
  providers: [AuthService, OAuthService, GoogleOAuthService],
})
export class GoogleOAuthModule {}
