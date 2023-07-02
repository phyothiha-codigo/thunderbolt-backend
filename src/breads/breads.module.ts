import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { UsersModule } from "../users/users.module";
import { RedisModule } from "../redis/redis.module";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [RedisModule,TypeOrmModule.forFeature([Bread, User]), UsersModule],
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
