import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Pet, User]), UsersModule],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
