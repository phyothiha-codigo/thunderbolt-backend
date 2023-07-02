import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marketplace } from './entities/marketplace.entity';
import { User } from "../users/entities/user.entity";
import { RedisModule } from "../redis/redis.module";

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Marketplace, User])],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
