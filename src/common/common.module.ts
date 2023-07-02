import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule, UsersModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
