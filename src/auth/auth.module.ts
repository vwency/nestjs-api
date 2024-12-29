import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AtStrategy, RtStrategy } from './strategies'
import { ConfigModule } from '@nestjs/config'
import { GoogleStrategy } from './utils/GoogleStrategy'
import { SessionSerializer } from './utils/Serializer'
import { OAuthController } from './oauth.contoller'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({}),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, OAuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
