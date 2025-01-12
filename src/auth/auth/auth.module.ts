import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AtStrategy } from './strategies'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    PassportModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, LocalStrategy],
})
export class AuthModule {}
