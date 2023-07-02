import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createPetDto: CreatePetDto, email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email, isDeleted: false, isVerified: true },
    });
    if (user != null) {
      const newPet = new Pet();
      newPet.name = createPetDto.name;
      newPet.age = createPetDto.age;
      newPet.color = createPetDto.color;
      newPet.description = createPetDto.description;
      newPet.bread = createPetDto.bread;
      newPet.species = createPetDto.species;
      newPet.user = user;
      const savePet = await this.petsRepository.save(newPet);
      if (savePet != null) {
        return {
          code: HttpStatus.OK,
          message: 'Success',
        };
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new InternalServerErrorException();
    }
    //return 'This action adds a new pet';
  }

  async findAll(userId: string) {
    const userPets = await this.petsRepository.find({
      relations: {
        petPhotos: true,
        species: true,
        bread: true,
      },
      where: {
        user: { id: userId },
      },
    });
    return {
      code: HttpStatus.OK,
      message: 'Success',
      data: {
        pets: userPets,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
