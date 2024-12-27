import { BadRequestException, Injectable } from '@nestjs/common';
import { DtoCreateCard } from '../dto/Create/CreateCard.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { ParamBDtoCard } from '../dto/cardBDto';
import { ParamDtoGetCard } from '../dto/Get/ParamGetCard.dto';
import { ParamDtoDeleteCard } from '../dto/Delete/ParamDeleteCard.dto';
import { ParamDtoUpdateCard } from '../dto/Update/ParamUpdateCard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Repository } from 'typeorm';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    private readonly crudLogic: CrudLogic,
  ) {}

  async getCard(cardDto: ParamDtoGetCard): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
    );

    const { card } = await crudLogic.findColumnCard(cardDto, true);

    return JSON.stringify(card);
  }

  async createCard(cardDto: DtoCreateCard): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
    );
    const { column } = await crudLogic.findColumnCard(cardDto, false);

    cardDto.column_id = column.column_id;
    cardDto.column_name = undefined;

    const payload: ParamBDtoCard = cardDto;

    const Card = this.cardRepository.create({
      ...payload,
    });

    return await this.cardRepository.save(Card);
    throw new BadRequestException('Create error');
  }

  async deleteCard(cardDto: ParamDtoDeleteCard): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
    );

    const { card } = await crudLogic.findColumnCard(cardDto, true);

    const CardDelete = await this.cardRepository.delete({
      ...card,
    });
    if (!!CardDelete.affected) return { message: 'Card deleted successfully' };
    throw new BadRequestException('Card was not deleted');
  }

  async updateCard(params: ParamDtoUpdateCard, updatePayload: Partial<Cards>) {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
    );

    const { card } = await crudLogic.findColumnCard(params, true);

    Object.assign(card, updatePayload);
    return await this.cardRepository.save(card);
  }
}
