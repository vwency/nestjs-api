import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth/auth.module'
import { CrudModule } from './crud/crud.module'
import { ConfigModule } from '@nestjs/config'
import { OAuthModule } from './auth/oauth/oauth.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: '.env',
    }),
    AuthModule,
    CrudModule,
    OAuthModule,
  ],
})
export class AppModule {}
