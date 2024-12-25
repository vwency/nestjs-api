import {
  Controller,
  Body,
  Put,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from '../services/comments.service';
import { ParamDtoComment } from '../dto/param.dto';
import { BodyDtoComment } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/:column_name/card/:card_name/comment/')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiTags('Comment')
  @ApiBody({
    description: 'Details to get comment',
    type: ParamDtoComment,
  })
  @ApiOperation({ summary: 'Get comment by name' })
  @ApiResponse({ status: 200, description: 'Comment' })
  @UseGuards(AtGuard)
  @Get(':comment_name')
  async getComment(@Param() params: ParamDtoComment) {
    return await this.commentService.getComment(params);
  }

  @ApiTags('Comment')
  @ApiBody({
    description: 'Details to create comment',
    type: () => [ParamDtoComment, BodyDtoComment],
  })
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @UseGuards(AtGuard)
  @Post('add')
  async addComment(
    @Param() params: ParamDtoComment,
    @Body() body: BodyDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    const comDto = { ...params, user_id: userId, ...body };
    return await this.commentService.createComment(comDto);
  }

  @ApiTags('Comment')
  @ApiBody({
    description: 'Details to delete comment',
    type: ParamDtoComment,
  })
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted' })
  @UseGuards(AtGuard)
  @Delete(':comment_name')
  async deleteComment(
    @Param() params: ParamDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.deleteComment({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Comment')
  @ApiBody({
    description: 'Details to update comment',
    type: () => [ParamDtoComment, BodyDtoComment],
  })
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 201, description: 'Comment updated' })
  @UseGuards(AtGuard)
  @Put(':comment_name')
  async updateColumn(
    @Param() params: ParamDtoComment,
    @Body() body: BodyDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.updateComment(
      { ...params, user_id: userId },
      body,
    );
  }
}
