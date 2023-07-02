import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOtpDto } from './dto/create-otp.dto';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Otp' })
  getOtp(@Request() req) {
    return this.otpService.sendOtp(req.user.sub, req.user.email);
  }
  @Post('verify')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Verify Otp' })
  verifyOtp(@Body() body: CreateOtpDto, @Request() req) {
    return this.otpService.verify(req.user.sub, req.user.email, body);
  }
}
