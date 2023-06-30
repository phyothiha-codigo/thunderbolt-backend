import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './sign_in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.email);
    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

  private async generateJWT(data: { sub: string; email: string }) {
    return await this.jwtService.signAsync(data);
  }
}
