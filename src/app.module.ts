import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: process.env.ENV_FILE_PATH || '.env',
    }),
    AuthModule,
    CrudModule,
  ],
})
export class AppModule {}
