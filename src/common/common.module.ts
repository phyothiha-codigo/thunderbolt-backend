import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [RedisModule, UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
