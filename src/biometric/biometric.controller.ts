import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BiometricService } from './biometric.service';
import { CreateBiometricDto } from './dto/create-biometric.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('biometric')
@Controller('biometric')
export class BiometricController {
  constructor(private readonly biometricService: BiometricService) {}

  @Post('setUpBiometric')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Setup User Biometric' })
  create(@Request() req) {
    return this.biometricService.create(req.user.sub);
  }

  @Post('loginBiometric')
  @ApiOperation({ summary: 'Login User Biometric' })
  loginBiometric(@Body() req: CreateBiometricDto) {
    return this.biometricService.loginBiometric(req.biometric_token);
  }

  @Delete('removeBiometric')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remove User Biometric' })
  removeBiometric(@Request() req) {
    return this.biometricService.removeBiometric(req.user.sub);
  }
}
