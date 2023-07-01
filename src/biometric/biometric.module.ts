import { Module } from '@nestjs/common';
import { BiometricService } from './biometric.service';
import { BiometricController } from './biometric.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UsersModule],
  controllers: [BiometricController],
  providers: [BiometricService],
})
export class BiometricModule {}
