import { BadRequestException, Injectable } from '@nestjs/common';
import { DtoCreateComment } from '../dto/Create/comment.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { ParamDtoGetComment } from '../dto/Get/ParamGet.dto';
import { ParamDtoDeleteComment } from '../dto/Delete/ParamDeleteComment.dto';
import { ParamDtoUpdateComment } from '../dto/Update/ParamUpdateComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm/schema/user.entity';
import { Columns } from 'src/typeorm/schema/column.entity';
import { Cards } from 'src/typeorm/schema/card.entity';
import { Comments } from 'src/typeorm/schema/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async getComment(params: ParamDtoGetComment): Promise<string> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );

    const { comment } = await crudLogic.findColumnCardComment(params, true);

    return JSON.stringify(comment);
  }

  async createComment(comDto: DtoCreateComment): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );
    const { column, card } = await crudLogic.findColumnCardComment(
      comDto,
      false,
    );

    comDto.column_id = column.column_id;
    comDto.card_id = card.card_id;
    comDto.column_name = undefined;
    comDto.card_name = undefined;

    const Comment = this.commentRepository.create({
      ...comDto,
    });

    return await this.commentRepository.save(Comment);
    throw new BadRequestException('Create error');
  }

  async deleteComment(params: ParamDtoDeleteComment): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );
    const { comment } = await crudLogic.findColumnCardComment(params, true);

    const DeletedComment = await this.commentRepository.delete({
      ...comment,
    });

    if (!!DeletedComment.affected)
      return { message: 'Comment deleted successfully' };
    throw new BadRequestException('Card was not deleted');
  }

  async updateComment(
    params: ParamDtoUpdateComment,
    updatePayload: Partial<Comments>,
  ) {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );

    const { comment } = await crudLogic.findColumnCardComment(params, true);

    Object.assign(comment, updatePayload);
    return await this.commentRepository.save(comment);
  }
}
