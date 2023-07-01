import { ApiProperty } from '@nestjs/swagger';

export class CreateBiometricDto {
  @ApiProperty({
    example: 'axsdZ12334Z',
    description: 'Biometric token of User',
  })
  biometric_token: string;
}
