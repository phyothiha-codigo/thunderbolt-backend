import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Pet } from '../pets/entities/pet.entity';
import * as bcrypt from 'bcrypt';

export type UserMock = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async create(createUserDto: CreateUserDto) {
    //save pets
    for (const pet of createUserDto.pets) {
      await this.petsRepository.save(pet);
    }
    //save user
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(createUserDto.password, salt);
    user.googleId = createUserDto.google_id;
    user.appleId = createUserDto.apple_id;
    user.facebookId = createUserDto.facebook_id;
    user.profileUrl = createUserDto.profile_url;
    user.pets = createUserDto.pets;
    return await this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { email: email, isDeleted: false },
      relations: {
        pets: {
          species: true,
          petPhotos: true,
          bread: true,
        },
      },
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
        isVerified: true,
      },
    });
    if (user != null) {
      user.isDeleted = true;
      const updatedUser = await this.usersRepository.save(user);
      if (updatedUser != null) {
        return {
          code: HttpStatus.OK,
          message: 'Success',
        };
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async setVerifyUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (user != null) {
      user.isVerified = true;
      const updated = await this.usersRepository.save(user);
      if (updated != null) {
        return {
          code: HttpStatus.OK,
          message: 'Success',
        };
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
