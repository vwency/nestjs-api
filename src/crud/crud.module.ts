import { Module } from '@nestjs/common';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentsModule } from './comment/comments.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ColumnModule, CardModule, CommentsModule],
})
export class CrudModule {}
