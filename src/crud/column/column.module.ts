import { Module } from '@nestjs/common'
import { ColumnController } from './controllers/column.controller'
import { ColumnService } from './services/column.service'
import { CrudLogic } from '../logic/crud.ts.service'

@Module({
  controllers: [ColumnController],
  imports: [],
  providers: [ColumnService, CrudLogic],
})
export class ColumnModule {}
