import { Module } from '@nestjs/common'
import { GoogleStrategy } from './utils/GoogleStrategy'
import { SessionSerializer } from '../Serializer'
import { OAuthController } from './google-oauth.contoller'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({}),
    }),
  ],
  controllers: [OAuthController],
  providers: [GoogleStrategy, SessionSerializer, AuthService],
})
export class GoogleOAuthModule {}
