import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { UserService } from '../user/services/user.service';
import { CommentsService } from './services/comments.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/typeorm/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Module({
  controllers: [CommentsController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService, CommentsService, JwtService],
})
export class CommentsModule {}
