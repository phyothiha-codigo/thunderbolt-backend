import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreadsService {
  constructor(
    @InjectRepository(Bread)
    private breadRepository: Repository<Bread>,
  ) {}
  async create(createBreadDto: CreateBreadDto) {
    const newBread = new Bread();
    newBread.breadName = createBreadDto.bread_name;
    newBread.breadThumbnailUrl = createBreadDto.bread_thumbnail_url;
    newBread.species = createBreadDto.species;
    const savedBread = await this.breadRepository.save(newBread);
    if (savedBread != null) {
      return {
        code: HttpStatus.CREATED,
        message: 'Success',
      };
    } else {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const data = await this.breadRepository.find({
      relations: {
        species: true,
      },
    });
    return {
      code: HttpStatus.OK,
      message: 'Success',
      data: {
        breads: data,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} bread`;
  }

  update(id: number, updateBreadDto: UpdateBreadDto) {
    return `This action updates a #${id} bread`;
  }

  remove(id: number) {
    return `This action removes a #${id} bread`;
  }
}
