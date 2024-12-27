import { Injectable, NotFoundException } from '@nestjs/common';
import { DtoCreateColumn } from '../dto/Create/column.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { ParamDtoUpdateColumn } from '../dto/Update/ParamUpdateColumn.dto';
import { ParamDtoDeleteColumn } from '../dto/Delete/ParamDeleteColumn.dto';
import { ParamDtoGetColumn } from '../dto/Get/ParamGetColumn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Repository } from 'typeorm';
import { Columns } from 'src/typeorm/schema/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
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

    const deletedColumn = await this.columnRepository.delete({ ...params });

    if (!!deletedColumn.affected)
      return { message: 'Column deleted successfully' };
    throw new NotFoundException('Column not found');
  }

  async createColumn(ColumnDto: DtoCreateColumn): Promise<any> {
    const column = await this.crud.findColumn(ColumnDto);

    if (column) throw new NotFoundException('Column existed found');

    const newColumn = this.columnRepository.create({
      ...ColumnDto,
    });

    return await this.columnRepository.save(newColumn);
  }

  async updateColumn(
    params: ParamDtoUpdateColumn,
    updatePayload: Partial<Columns>,
  ) {
    const column = await this.crud.findColumn(params);

    if (!column) throw new NotFoundException('Column not found');

    Object.assign(column, updatePayload);

    return await this.columnRepository.save(column);
  }
}
