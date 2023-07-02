import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Bread]), UsersModule],
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
