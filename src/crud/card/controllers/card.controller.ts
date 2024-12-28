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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardService } from '../services/card.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';
import { ParamDtoGetCard } from '../dto/Get/ParamGetCard.dto';
import { ParamDtoCreateCard } from '../dto/Create/ParamCreateCard.dto';
import { BodyDtoCreateCard } from '../dto/Create/BodyCreateCard.dto';
import { ParamDtoDeleteCard } from '../dto/Delete/ParamDeleteCard.dto';
import { ParamDtoUpdateCard } from '../dto/Update/ParamUpdateCard.dto';
import { BodyDtoUpdateCard } from '../dto/Update/BodyUpdateCard.dto';

@Controller('column/:column_name/card/')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiTags('Card')
  @ApiBearerAuth()
  @ApiBody({ description: 'The card details to update', type: ParamDtoGetCard })
  @ApiOperation({ summary: 'Get card By ID' })
  @ApiResponse({ status: 200, description: 'Card' })
  @UsePipes(new ValidationPipe())
  @Get(':card_name')
  async getCards(@Param() params: ParamDtoGetCard) {
    return await this.cardService.getCard(params);
  }

  @ApiTags('Card')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to create card',
    type: () => [ParamDtoCreateCard, BodyDtoCreateCard],
  })
  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: 201, description: 'Card created' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createCard(
    @Param() params: ParamDtoCreateCard,
    @Body() body: BodyDtoCreateCard,
    @GetCurrentUserId() userId: string,
  ) {
    const payload = {
      ...params,
      ...body,
      user_id: userId,
      column_id: undefined,
    };
    return await this.cardService.createCard(payload);
  }

  @ApiTags('Card')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to delete card',
    type: ParamDtoDeleteCard,
  })
  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: 200, description: 'Card deleted' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':card_name')
  async deleteCard(
    @Param() cardDto: ParamDtoDeleteCard,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.deleteCard({
      ...cardDto,
      user_id: userId,
    });
  }

  @ApiTags('Card')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Details to update card',
    type: () => [ParamDtoUpdateCard, BodyDtoUpdateCard],
  })
  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: 200, description: 'Card updated' })
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Put(':card_name')
  async updateColumn(
    @Param() params: ParamDtoUpdateCard,
    @Body() body: BodyDtoUpdateCard,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.updateCard(
      { ...params, user_id: userId },
      body,
    );
  }
}
