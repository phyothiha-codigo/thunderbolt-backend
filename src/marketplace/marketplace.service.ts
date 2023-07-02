import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marketplace } from './entities/marketplace.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Marketplace)
    private markPlaceRepository: Repository<Marketplace>,
  ) {}

  async setupUserMarketPlace(createMarketplaceDto: CreateMarketplaceDto) {
    const newUserMarket = new Marketplace();
    newUserMarket.name = createMarketplaceDto.name;
    newUserMarket.description = createMarketplaceDto.description;
    newUserMarket.user = createMarketplaceDto.user;

    const market = await this.markPlaceRepository.save(newUserMarket);
    return {
      code: HttpStatus.CREATED,
      message: 'Success',
      data: {
        marketPlace: market,
      },
    };
  }

  async getAllMarketPlaceItems(id: string) {
    const marketPlace = await this.markPlaceRepository.find({
      relations: {
        pets: {
          bread: true,
          species: true,
          petPhotos: true,
          petDocuments: true,
          petCertifications: true,
          user: true,
          marketPlace: true,
        },
      },
      where: {
        user: { id: Not(id) },
      },
    });

    if (marketPlace != null) {
      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: {
          marketPlaceItems: marketPlace.map((e) => e.pets),
        },
      };
    } else {
      throw new InternalServerErrorException();
    }
  }

  async getMyMarketPlace(userId: string) {
    const marketPlace = await this.markPlaceRepository.findOne({
      relations: {
        pets: {
          bread: true,
          species: true,
          petPhotos: true,
          petDocuments: true,
          petCertifications: true,
          user: true,
        },
        user: true,
      },
      where: {
        user: { id: userId },
      },
    });

    if (marketPlace != null) {
      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: {
          marketPlace: marketPlace,
        },
      };
    } else {
      throw new InternalServerErrorException();
    }
  }

  create(createMarketplaceDto: CreateMarketplaceDto) {
    return 'This action adds a new marketplace';
  }

  findAll() {
    return `This action returns all marketplace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketplace`;
  }

  update(id: number, updateMarketplaceDto: UpdateMarketplaceDto) {
    return `This action updates a #${id} marketplace`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketplace`;
  }
}
