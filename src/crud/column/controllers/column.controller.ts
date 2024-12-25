import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnService } from '../services/column.service';
import { ParamDtoColumn } from '../dto/param.dto';
import { BodyDtoColumn } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiTags('Column')
  @ApiBody({ description: 'Detail to get column', type: ParamDtoColumn })
  @ApiOperation({ summary: 'Get column by name' })
  @ApiResponse({ status: 200, description: 'Column' })
  @UseGuards(AtGuard)
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(
    @Param() params: ParamDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.GetColumnData({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Column')
  @ApiBody({
    description: 'Details to create column',
    type: () => [ParamDtoColumn, BodyDtoColumn],
  })
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, description: 'Column created' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.createColumn({
      ...params,
      ...body,
      user_id: userId,
    });
  }

  @ApiTags('Column')
  @ApiBody({
    description: 'Details to delete column',
    type: ParamDtoColumn,
  })
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 200, description: 'Column created' })
  @UseGuards(AtGuard)
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(
    @Param() params: ParamDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.deleteColumn({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Column')
  @ApiBody({
    description: 'Details to update column',
    type: () => [ParamDtoColumn, BodyDtoColumn],
  })
  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, description: 'Column updated' })
  @UseGuards(AtGuard)
  @Put(':column_name')
  @UsePipes(new ValidationPipe())
  async updateColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.updateColumn(
      { ...params, user_id: userId },
      body,
    );
  }
}
