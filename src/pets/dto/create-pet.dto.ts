import { Bread } from '../../breads/entities/bread.entity';
import { Species } from '../../species/entities/species.entity';

export class CreatePetDto {
  name: string;
  age: number;
  color: string;
  description: string;
  bread: Bread;
  species: Species;
}
