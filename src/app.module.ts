import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CrudModule } from './crud/crud.module'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { GoogleOAuthModule } from './oath/google/oauth.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: '.env',
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    CrudModule,
    GoogleOAuthModule,
  ],
})
export class AppModule {}
