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
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller('pets')
@ApiTags('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('createNewPet')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() createPetDto: CreatePetDto, @Request() req) {
    return this.petsService.create(createPetDto, req.user.email);
  }

  @Get('getUserPets')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll(@Request() req) {
    return this.petsService.findAll(req.user.sub);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.petsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
  //   return this.petsService.update(+id, updatePetDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.petsService.remove(+id);
  // }
}
