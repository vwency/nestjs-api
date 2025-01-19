import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GithubOAuthService } from './github.service'
import { GithubOAuthController } from './github.contoller'
import { SessionSerializer } from 'src/auth/serializer/Serializer'
import { AuthService } from 'src/auth/auth/auth.service'

@Module({
  imports: [PassportModule.register({ session: true })],

  controllers: [GithubOAuthController],
  providers: [GithubOAuthService, SessionSerializer, AuthService],
})
export class GithubOAuthModule {}
