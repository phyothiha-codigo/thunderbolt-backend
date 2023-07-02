import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { RedisModule } from '../redis/redis.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
