import {
  Controller,
  Body,
  Put,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CommentsService } from '../services/comments.service'
import { GetCurrentUserId } from 'src/auth/common/decorators'
import { AtGuard } from 'src/auth/auth/guards'
import { ParamDtoGetComment } from '../dto/Get/ParamGet.dto'
import { ParamDtoCreateComment } from '../dto/Create/ParamCreateComment.dto'
import { BodyDtoCreateComment } from '../dto/Create/BodyCreateComment.dto'
import { ParamDtoDeleteComment } from '../dto/Delete/ParamDeleteComment.dto'
import { ParamDtoUpdateComment } from '../dto/Update/ParamUpdateComment.dto'
import { BodyDtoUpdateComment } from '../dto/Update/BodyUpdateComment.dto'

@Controller('column/:column_name/card/:card_name/comment/')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiTags('Comment')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to get comment',
    type: ParamDtoGetComment,
  })
  @ApiOperation({ summary: 'Get comment by name' })
  @ApiResponse({ status: 200, description: 'Comment' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Get(':comment_name')
  async getComment(
    @Param() params: ParamDtoGetComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.getComment({ ...params, user_id: userId })
  }

  @ApiTags('Comment')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to create comment',
    type: () => [ParamDtoCreateComment, BodyDtoCreateComment],
  })
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async addComment(
    @Param() params: ParamDtoCreateComment,
    @Body() body: BodyDtoCreateComment,
    @GetCurrentUserId() userId: string,
  ) {
    const comDto = {
      ...params,
      user_id: userId,
      ...body,
      column_id: undefined,
      card_id: undefined,
    }
    return await this.commentService.createComment(comDto)
  }

  @ApiTags('Comment')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to delete comment',
    type: ParamDtoDeleteComment,
  })
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':comment_name')
  async deleteComment(
    @Param() params: ParamDtoDeleteComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.deleteComment({
      ...params,
      user_id: userId,
    })
  }

  @ApiTags('Comment')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to update comment',
    type: () => [ParamDtoUpdateComment, BodyDtoUpdateComment],
  })
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 201, description: 'Comment updated' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Put(':comment_name')
  async updateColumn(
    @Param() params: ParamDtoUpdateComment,
    @Body() body: BodyDtoUpdateComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.updateComment(
      { ...params, user_id: userId },
      body,
    )
  }
}
