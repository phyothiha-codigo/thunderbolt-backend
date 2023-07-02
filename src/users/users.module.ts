import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { RedisModule } from '../redis/redis.module';
import { Marketplace } from '../marketplace/entities/marketplace.entity';
import { MarketplaceModule } from '../marketplace/marketplace.module';

@Module({
  imports: [
    RedisModule,
    MarketplaceModule,
    TypeOrmModule.forFeature([User, Pet, Marketplace]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
