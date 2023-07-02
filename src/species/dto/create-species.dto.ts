import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
  @ApiProperty({
    example: 'Golden Retriever',
    description: 'species_name',
  })
  species_name: string;
  @ApiProperty({
    example: 'https://imageurl',
    description: 'species_thumbnail',
  })
  species_thumbnail: string;
}
