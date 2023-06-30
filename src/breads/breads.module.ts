import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bread])],
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
