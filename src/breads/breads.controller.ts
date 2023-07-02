import {
  Controller,
  Get,
  Post,
  Body,

  UseGuards,
} from '@nestjs/common';
import { BreadsService } from './breads.service';
import { CreateBreadDto } from './dto/create-bread.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('breads')
@ApiTags('breads')
export class BreadsController {
  constructor(private readonly breadsService: BreadsService) {}

  @Post('createBread')
  create(@Body() createBreadDto: CreateBreadDto) {
    return this.breadsService.create(createBreadDto);
  }

  @Get('getAllBreads')
  findAll() {
    return this.breadsService.findAll();
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.breadsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBreadDto: UpdateBreadDto) {
  //   return this.breadsService.update(+id, updateBreadDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.breadsService.remove(+id);
  // }
}
