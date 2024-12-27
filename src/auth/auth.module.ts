import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/typeorm/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({}),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
