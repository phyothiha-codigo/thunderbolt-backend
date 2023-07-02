import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
  @ApiProperty({
    example: 123345,
    description: 'Otp',
  })
  otp: number;
}
