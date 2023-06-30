import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";

@Controller('species')
@ApiTags('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post('createNewSpecies')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get('getAlSpecies')
  @UseGuards(AuthGuard)
  findAll() {
    return this.speciesService.findAll();
  }
  //
  // @Get(':id')
  // @UseGuards(AuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.speciesService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
  //   return this.speciesService.update(+id, updateSpeciesDto);
  // }
  //
  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.speciesService.remove(+id);
  // }
}
