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
} from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ColumnService } from '../services/column.service'
import { BodyDtoColumn } from '../dto/body.dto'
import { GetCurrentUserId } from 'src/auth/common/decorators'
import { AtGuard } from 'src/auth/common/guards'
import { ParamDtoGetColumn } from '../dto/Get/ParamGetColumn.dto'
import { ParamDtoCreateColumn } from '../dto/Create/ParamCreateColumn.dto'
import { BodyDtoCreateColumn } from '../dto/Create/BodyCreateColumn.dto'
import { ParamDtoDeleteColumn } from '../dto/Delete/ParamDeleteColumn.dto'
import { ParamDtoUpdateColumn } from '../dto/Update/ParamUpdateColumn.dto'
import { BodyDtoUpdateColumn } from '../dto/Update/BodyUpdateColumn.dto'

@Controller('column/')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiTags('Column')
  @ApiBearerAuth()
  @ApiBody({ description: 'Detail to get column', type: ParamDtoGetColumn })
  @ApiOperation({ summary: 'Get column by name' })
  @ApiResponse({ status: 200, description: 'Column' })
  @UseGuards(AtGuard)
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(
    @Param() params: ParamDtoGetColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.GetColumnData({
      ...params,
      user_id: userId,
    })
  }

  @ApiTags('Column')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to create column',
    type: () => [ParamDtoCreateColumn, BodyDtoCreateColumn],
  })
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, description: 'Column created' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createColumn(
    @Param() params: ParamDtoCreateColumn,
    @Body() body: BodyDtoCreateColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.createColumn({
      ...params,
      ...body,
      user_id: userId,
    })
  }

  @ApiTags('Column')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to delete column',
    type: ParamDtoDeleteColumn,
  })
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 200, description: 'Column created' })
  @UseGuards(AtGuard)
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(
    @Param() params: ParamDtoDeleteColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.deleteColumn({
      ...params,
      user_id: userId,
    })
  }

  @ApiTags('Column')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to update column',
    type: () => [ParamDtoUpdateColumn, BodyDtoColumn],
  })
  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, description: 'Column updated' })
  @UseGuards(AtGuard)
  @Put(':column_name')
  @UsePipes(new ValidationPipe())
  async updateColumn(
    @Param() params: ParamDtoUpdateColumn,
    @Body() body: BodyDtoUpdateColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.updateColumn(
      { ...params, user_id: userId },
      body,
    )
  }
}
