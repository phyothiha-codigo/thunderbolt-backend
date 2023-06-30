import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto) {
    const newSpecies = new Species();
    newSpecies.speciesName = createSpeciesDto.species_name;
    newSpecies.speciesThumbnail = createSpeciesDto.species_thumbnail;
    const data = await this.speciesRepository.save(newSpecies);
    if (data != null) {
      return {
        code: HttpStatus.CREATED,
        message: 'Success',
      };
    } else {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const data = await this.speciesRepository.find({
      relations: {
        breads: true,
      },
    });
    return {
      code: HttpStatus.OK,
      message: 'Success',
      data: {
        species: data,
      },
    };
    //return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
