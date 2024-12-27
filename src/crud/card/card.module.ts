import { Module } from '@nestjs/common';
import { CardController } from './controllers/card.controller';
import { UserService } from '../user/services/user.service';
import { CardService } from './services/card.service';
import { JwtService } from '@nestjs/jwt';
import { CrudLogic } from '../logic/crud.ts.service';
import { DatabaseModule } from 'src/typeorm/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Module({
  controllers: [CardController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService, CardService, JwtService, CrudLogic],
})
export class CardModule {}
