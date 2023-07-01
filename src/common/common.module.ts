import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
