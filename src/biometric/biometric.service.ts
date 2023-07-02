import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BiometricService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}
  async create(userid: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userid,
        isVerified: true,
        isDeleted: false,
      },
    });
    if (user != null) {
      user.biometricToken = await bcrypt.hash(userid, 10);
      const updatedUser = await this.userRepository.save(user);
      if (updatedUser != null) {
        return {
          code: HttpStatus.CREATED,
          message: 'Success',
          data: {
            biometricToken: updatedUser.biometricToken,
          },
        };
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new InternalServerErrorException();
    }
  }

  async loginBiometric(token: string) {
    const user = await this.userRepository.findOne({
      where: {
        biometricToken: token,
      },
    });
    if (user != null) {
      const jwt = await this.authService.generateJWT({
        sub: user.id,
        email: user.email,
      });
      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: {
          access_token: jwt,
        },
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async removeBiometric(userid: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userid,
        isVerified: true,
        isDeleted: false,
      },
    });
    if (user != null) {
      user.biometricToken = null;
      const updatedUser = await this.userRepository.save(user);
      if (updatedUser != null) {
        return {
          code: HttpStatus.CREATED,
          message: 'Success',
        };
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new InternalServerErrorException();
    }
  }
}
