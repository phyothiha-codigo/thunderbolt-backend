import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckPasswordDto } from './dto/checkpassword-dto';
import { MarketplaceService } from '../marketplace/marketplace.service';
import { CreateMarketplaceDto } from '../marketplace/dto/create-marketplace.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly marketPlaceService: MarketplaceService,
  ) {}

  @Delete('deleteUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete User' })
  async create(@Request() req) {
    return await this.usersService.remove(req.user.sub);
  }
  @Patch('updateProfile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update User' })
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    return await this.usersService.updateProfile(req.user.sub, body);
  }
  @Post('checkPassword')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check User Password' })
  async checkPassword(@Request() req, @Body() body: CheckPasswordDto) {
    return await this.usersService.checkPassword(req.user.sub, body);
  }
  @Post('updatePassword')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update User Password' })
  async updatePassword(@Request() req, @Body() body: CheckPasswordDto) {
    return await this.usersService.updatePassword(req.user.sub, body);
  }

  @Post('createUserMarketPlace')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create User MarketPlace' })
  async createUserMarketPlace(
    @Request() req,
    @Body() dto: CreateMarketplaceDto,
  ) {
    dto.user = await this.usersService.findOne(req.user.email);
    const marketPlace = await this.marketPlaceService.setupUserMarketPlace(dto);
    if (marketPlace != null && marketPlace.code == HttpStatus.CREATED) {
      //update in user side
      return await this.usersService.createAndLinkMarketPlace(
        req.user.sub,
        marketPlace.data.marketPlace,
      );
    } else {
      throw new InternalServerErrorException();
    }
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
