import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'test@yopmail.com',
    description: 'Email of user',
  })
  email: string;
  @ApiProperty({
    example: 'abc123',
    description: 'Password of user',
  })
  password: string;
}
