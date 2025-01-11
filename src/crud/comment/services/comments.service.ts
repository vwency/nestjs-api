import { Injectable } from '@nestjs/common'
import { DtoCreateComment } from '../dto/Create/comment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CrudLogic } from 'src/crud/logic/crud.ts.service'
import { ParamDtoGetComment } from '../dto/Get/ParamGet.dto'
import { ParamDtoDeleteComment } from '../dto/Delete/ParamDeleteComment.dto'
import { ParamDtoUpdateComment } from '../dto/Update/ParamUpdateComment.dto'
import { BodyDtoUpdateComment } from '../dto/Update/BodyUpdateComment.dto'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getComment(params: ParamDtoGetComment): Promise<string> {
    const crudLogic = new CrudLogic(this.prisma)
    const { comment } = await crudLogic.findColumnCardComment(params, true)

    return JSON.stringify(comment)
  }

  async createComment(comDto: DtoCreateComment): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma)
    const { column, card } = await crudLogic.findColumnCardComment(
      comDto,
      false,
    )

    comDto.column_id = column.column_id
    comDto.card_id = card.card_id
    comDto.column_name = undefined
    comDto.card_name = undefined

    return this.prisma.comments.create({
      data: {
        ...comDto,
      },
    })
  }

  async deleteComment(params: ParamDtoDeleteComment): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma)
    const { comment } = await crudLogic.findColumnCardComment(params, true)

    return this.prisma.comments.delete({
      where: {
        comment_id: comment.comment_id,
      },
    })
  }

  async updateComment(
    params: ParamDtoUpdateComment,
    updatePayload: BodyDtoUpdateComment,
  ) {
    const crudLogic = new CrudLogic(this.prisma)

    const { comment } = await crudLogic.findColumnCardComment(params, true)

    return this.prisma.comments.update({
      where: {
        comment_id: comment.comment_id,
      },
      data: updatePayload,
    })
  }
}
