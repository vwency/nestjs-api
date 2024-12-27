import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';
import { CrudLogic } from '../logic/crud.ts.service';
import { DatabaseModule } from 'src/typeorm/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Module({
  controllers: [ColumnController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [ColumnService, JwtService, CrudLogic],
})
export class ColumnModule {}
