import { Species } from '../../species/entities/species.entity';

export class CreateBreadDto {
  bread_name: string;
  bread_thumbnail_url: string;
  species: Species;
}
