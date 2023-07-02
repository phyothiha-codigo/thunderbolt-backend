import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from '../auth/auth.guard';

@Controller('marketplace')
@ApiTags('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('getMarketPlaceItems')
  @ApiOperation({ summary: 'Get all sales/adoption items' })
  getAllMarketPlaces(@Request() req) {
    return this.marketplaceService.getAllMarketPlaceItems(req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('getMyMarketPlace')
  @ApiOperation({ summary: 'Get user marketplace' })
  getMyMarketPlace(@Request() req) {
    return this.marketplaceService.getMyMarketPlace(req.user.sub);
  }

  @Post()
  create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
    return this.marketplaceService.create(createMarketplaceDto);
  }

  @Get()
  findAll() {
    return this.marketplaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarketplaceDto: UpdateMarketplaceDto,
  ) {
    return this.marketplaceService.update(+id, updateMarketplaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketplaceService.remove(+id);
  }
}
