import { Injectable } from '@nestjs/common'
import { DtoCreateCard } from '../dto/Create/CreateCard.dto'
import { CrudLogic } from 'src/crud/logic/crud.ts.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BodyCardDto } from '../dto/body.dto'
import { ParamBDtoCard } from '../dto/cardBDto'
import { ParamDtoGetCard } from '../dto/Get/ParamGetCard.dto'
import { ParamDtoDeleteCard } from '../dto/Delete/ParamDeleteCard.dto'
import { ParamDtoUpdateCard } from '../dto/Update/ParamUpdateCard.dto'

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async getCard(cardDto: ParamDtoGetCard): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma)
    const { card } = await crudLogic.findColumnCard(cardDto, true)

    return JSON.stringify(card)
  }

  async createCard(cardDto: DtoCreateCard): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma)
    const { column } = await crudLogic.findColumnCard(cardDto, false)

    cardDto.column_id = column.column_id
    cardDto.column_name = undefined

    const payload: ParamBDtoCard = cardDto

    return await this.prisma.cards.create({
      data: {
        ...payload,
      },
    })
  }

  async deleteCard(cardDto: ParamDtoDeleteCard): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma)
    const { card } = await crudLogic.findColumnCard(cardDto, true)

    return await this.prisma.cards.delete({
      where: {
        card_id: card.card_id,
      },
    })
  }

  async updateCard(params: ParamDtoUpdateCard, updatePayload: BodyCardDto) {
    const crudLogic = new CrudLogic(this.prisma)

    const { card } = await crudLogic.findColumnCard(params, true)

    return await this.prisma.cards.update({
      where: {
        card_id: card.card_id,
      },
      data: updatePayload,
    })
  }
}
