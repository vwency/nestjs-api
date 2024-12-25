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
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';
import { ParamDtoCard } from '../dto/param.dto';
import { BodyCardDto } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/:column_name/card/')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiTags('Card')
  @ApiBody({ description: 'The card details to update', type: ParamDtoCard })
  @ApiOperation({ summary: 'Get card By ID' })
  @ApiResponse({ status: 200, description: 'Card' })
  @Get(':card_name')
  async getCards(@Param() params: ParamDtoCard) {
    return await this.cardService.getCard(params);
  }

  @ApiTags('Card')
  @ApiBody({
    description: 'Details to create card',
    type: () => [ParamDtoCard, BodyCardDto],
  })
  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: 201, description: 'Card created' })
  @UseGuards(AtGuard)
  @Post('add')
  async createCard(
    @Param() params: ParamDtoCard,
    @Body() body: BodyCardDto,
    @GetCurrentUserId() userId: string,
  ) {
    const payload = { ...params, ...body, user_id: userId };
    return await this.cardService.createCard(payload);
  }

  @ApiTags('Card')
  @ApiBody({
    description: 'Details to delete card',
    type: CardDto,
  })
  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: 200, description: 'Card deleted' })
  @UseGuards(AtGuard)
  @Delete(':card_name')
  async deleteCard(
    @Param() cardDto: CardDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.deleteCard({
      ...cardDto,
      user_id: userId,
    });
  }

  @ApiTags('Card')
  @ApiBody({
    description: 'Details to update card',
    type: () => [ParamDtoCard, BodyCardDto],
  })
  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: 200, description: 'Card updated' })
  @UseGuards(AtGuard)
  @Put(':card_name')
  async updateColumn(
    @Param() params: ParamDtoCard,
    @Body() body: BodyCardDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.updateCard(
      { ...params, user_id: userId },
      body,
    );
  }
}
