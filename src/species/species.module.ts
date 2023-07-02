import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { UsersModule } from "../users/users.module";
import { RedisModule } from "../redis/redis.module";

@Module({
  imports: [RedisModule,TypeOrmModule.forFeature([Species]), UsersModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
