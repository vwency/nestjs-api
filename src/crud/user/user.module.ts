import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { DatabaseModule } from 'src/typeorm/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService],
})
export class UserModule {}
