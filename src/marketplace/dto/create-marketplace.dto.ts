import { User } from '../../users/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarketplaceDto {
  @ApiProperty({
    example: 'Test',
    description: 'The name of user marketplace',
  })
  name: string;
  @ApiProperty({
    example: 'Desc',
    description: 'The desc of user market',
  })
  description: string;
  user?: User;
}
