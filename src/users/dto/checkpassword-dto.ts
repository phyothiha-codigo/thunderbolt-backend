import { ApiProperty } from '@nestjs/swagger';

export class CheckPasswordDto {
  @ApiProperty({
    example: '123345',
    description: 'password',
  })
  password: string;
}