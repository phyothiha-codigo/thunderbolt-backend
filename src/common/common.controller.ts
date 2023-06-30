import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() body) {
    const url = await this.commonService.upload(file, body.path);
    if (url != null || url != '') {
      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: {
          url: url,
        },
      };
    }
  }
}
