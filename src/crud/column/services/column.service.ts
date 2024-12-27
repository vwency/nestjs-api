import { Injectable, NotFoundException } from '@nestjs/common';
import { DtoCreateColumn } from '../dto/Create/column.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyDtoColumn } from '../dto/body.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { ParamDtoUpdateColumn } from '../dto/Update/ParamUpdateColumn.dto';
import { ParamDtoDeleteColumn } from '../dto/Delete/ParamDeleteColumn.dto';
import { ParamDtoGetColumn } from '../dto/Get/ParamGetColumn.dto';

@Injectable()
export class ColumnService {
  constructor(
    private prisma: PrismaService,
    private crud: CrudLogic,
  ) {}

  async GetColumnData(params: ParamDtoGetColumn): Promise<string> {
    const column = await this.crud.findColumn(params);
    if (!column) throw new NotFoundException('Column not founded');
    return JSON.stringify(column);
  }

  async deleteColumn(params: ParamDtoDeleteColumn): Promise<any> {
    const column = await this.crud.findColumn(params);

    if (!column) throw new NotFoundException('Column not founded');

    const deletedColumn = await this.prisma.columns.delete({
      where: {
        column_id: column.column_id,
      },
    });

    return deletedColumn;
  }

  async createColumn(ColumnDto: DtoCreateColumn): Promise<any> {
    const column = await this.crud.findColumn(ColumnDto);

    if (column) throw new NotFoundException('Column existed found');

    const createdColumn = await this.prisma.columns.create({
      data: {
        ...ColumnDto,
      },
    });

    return createdColumn;
  }

  async updateColumn(
    params: ParamDtoUpdateColumn,
    updatePayload: BodyDtoColumn,
  ) {
    const column = await this.crud.findColumn(params);

    if (!column) throw new NotFoundException('Column not found');

    const updatedColumn = await this.prisma.columns.update({
      where: { ...column },
      data: {
        ...updatePayload,
      },
    });

    return updatedColumn;
  }
}
