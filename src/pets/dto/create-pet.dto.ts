import { Bread } from '../../breads/entities/bread.entity';
import { Species } from '../../species/entities/species.entity';
import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto {
  @ApiProperty({
    example: 'Rex',
    description: 'name',
  })
  name: string;
  @ApiProperty({
    example: 1,
    description: 'age',
  })
  age: number;
  @ApiProperty({
    example: 'red',
    description: 'Color',
  })
  color: string;
  @ApiProperty({
    example: 'Test',
    description: 'description',
  })
  description: string;
  @ApiProperty({
    example: {
      id: 'uuid',
    },
    description: 'bread',
  })
  bread: Bread;
  @ApiProperty({
    example: {
      id: 'uuid',
    },
    description: 'species',
  })
  species: Species;
}
