import {
  ConflictException,
  Injectable,
  NotFoundException,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ParamBDtoCard } from '../card/dto/cardBDto';
import { ParamBDtoComment } from '../comment/dto/commentB.dto';
import { ParamDtoUser } from '../user/dto/param.dto';
import { ParamBDtoColumn } from '../column/dto/columnB.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Injectable()
export class CrudLogic {
  constructor(
    @InjectRepository(Users)
    @Optional()
    private readonly userRepository?: Repository<Users>,

    @InjectRepository(Columns)
    @Optional()
    private readonly columnRepository?: Repository<Columns>,

    @InjectRepository(Cards)
    @Optional()
    private readonly cardRepository?: Repository<Cards>,

    @InjectRepository(Comments)
    @Optional()
    private readonly commentRepository?: Repository<Comments>,
  ) {}

  async filterParams<T>(
    dto: new () => T,
    params: Record<string, any>,
  ): Promise<Partial<T>> {
    const instance = plainToClass(dto, {});
    const prototype = Object.keys(instance);
    const filteredParams = Object.keys(params)
      .filter((key) => prototype.includes(key))
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Partial<T>);

    return filteredParams;
  }

  async findComment(params: ParamBDtoComment) {
    const filteredParams = await this.filterParams(ParamBDtoComment, params);
    return await this.commentRepository.findOne({
      where: { ...filteredParams },
    });
  }

  async findCard(params: ParamBDtoCard) {
    const filteredParams = await this.filterParams(ParamBDtoCard, params);
    return await this.cardRepository.findOne({ where: { ...filteredParams } });
  }

  async findColumn(params: ParamBDtoColumn) {
    const filteredParams = await this.filterParams(ParamBDtoColumn, params);
    return await this.columnRepository.findOne({
      where: { ...filteredParams },
    });
  }

  async findUser(params: ParamDtoUser) {
    const filteredParams = await this.filterParams(ParamDtoUser, params);
    return await this.userRepository.findOne({
      where: { ...filteredParams },
    });
  }

  async findColumnCard(
    dto: any,
    found: boolean,
  ): Promise<{ column: any; card: any }> {
    const user = await this.findUser(dto);
    if (!user) {
      throw new UnauthorizedException();
    }

    dto['user_id'] = user?.user_id;

    const column = await this.findColumn(dto);
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    dto['column_id'] = column?.column_id;

    const card = await this.findCard(dto);

    if (found && !card) {
      throw new NotFoundException('Card not found');
    }

    if (!found && card) {
      throw new ConflictException('Card already exists');
    }

    return { column, card };
  }

  async findColumnCardComment(
    dto: any,
    found: boolean,
  ): Promise<{ column: any; card: any; comment: any }> {
    const user = await this.findUser(dto);
    if (!user) {
      throw new UnauthorizedException();
    }

    dto['user_id'] = user?.user_id;

    const column = await this.findColumn(dto);

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    dto['column_id'] = column?.column_id;

    const card = await this.findCard(dto);

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    dto['card_id'] = card?.card_id;

    const comment = await this.findComment(dto);

    if (found && !comment) {
      throw new NotFoundException('Comment not found');
    }

    if (!found && comment) {
      throw new ConflictException('Comment already exists');
    }

    return { column, card, comment };
  }
}
