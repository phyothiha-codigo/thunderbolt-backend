import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './sign_in.dto';
import { RedisService } from '../redis/redis.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.email);
    if (user != null) {
      if (!bcrypt.compareSync(signInDto.password, user.password)) {
        throw new UnauthorizedException();
      } else {
        if (user.isVerified) {
          const payload = { sub: user.id, email: user.email };

          return {
            code: HttpStatus.OK,
            message: 'Success',
            data: {
              access_token: await this.generateJWT(payload),
            },
          };
        } else {
          const payload = { sub: user.id, email: user.email };
          return {
            code: HttpStatus.UNAUTHORIZED,
            message: 'User not verified yet. Otp Sent',
            data: {
              session_token: await this.generateJWT(payload),
            },
          };
        }
      }
    } else {
      return new InternalServerErrorException();
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    const jwt = await this.generateJWT({
      sub: user.id,
      email: user.email,
    });
    if (user != null && jwt != '') {
      return {
        code: HttpStatus.OK,
        message: 'Success',
        data: {
          access_token: jwt,
        },
      };
    } else {
      throw new InternalServerErrorException();
    }
  }

  async getUser(email: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user.isDeleted) {
      throw new UnauthorizedException();
    } else {
      delete user.id;
      delete user.password;
      return {
        code: 200,
        message: 'Success',
        data: user,
      };
    }
  }

  async generateJWT(data: { sub: string; email: string }) {
    const userOldToken = await this.redisService.get(`token_${data.sub}`);
    if (userOldToken != null) {
      await this.redisService.delete(`token_${data.sub}`);
      await this.redisService.set(
        `black_list_token_${data.sub}`,
        userOldToken,
        0,
      );
    }
    const jwt = await this.jwtService.signAsync(data);
    await this.redisService.set(`token_${data.sub}`, jwt, 3600000);
    return jwt;
  }

  async logout(id: string) {
    const userOldToken = await this.redisService.get(`token_${id}`);
    if (userOldToken != null) {
      await this.redisService.delete(`token_${id}`);
      await this.redisService.set(`black_list_token_${id}`, userOldToken, 0);
    }
    return {
      code: HttpStatus.OK,
      message: 'Success',
    };
  }

  private generateRandomNumber() {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
