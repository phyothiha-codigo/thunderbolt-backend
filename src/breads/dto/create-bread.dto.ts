import { Species } from '../../species/entities/species.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreadDto {
  @ApiProperty({
    example: 'Dog',
    description: 'bread_name',
  })
  bread_name: string;
  @ApiProperty({
    example: 'https://imageurl',
    description: 'bread_thumbnail_url',
  })
  bread_thumbnail_url: string;
  @ApiProperty({
    description: 'species',
    type: Species,
    example: {
      id: 'uuid',
    },
  })
  species: Species;
}
