import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { RedisService } from '../redis/redis.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import * as awsServices from 'aws-sdk';

const SES_CONFIG = {
  accessKeyId: 'AKIA2RMLXM5B4BFFOO4J',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
};

@Injectable()
export class OtpService {
  constructor(
    private redisService: RedisService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  async sendOtp(userId: string, email: string) {
    await this.redisService.delete(userId);
    //send email otp
    const newOtp = this.generateRandomNumber();
    await this.sendEmail(email, newOtp.toString());
    await this.redisService.set(userId, newOtp, 900000);
    return {
      code: HttpStatus.OK,
      message: 'Success',
    };
  }

  async verify(userId: string, email: string, data: CreateOtpDto) {
    const otp = await this.redisService.get(userId);
    if (otp as number) {
      if (otp === data.otp) {
        await this.redisService.delete(userId);
        const update = await this.userService.setVerifyUser(userId);
        if (update.code === HttpStatus.OK) {
          const jwt = await this.authService.generateJWT({
            sub: userId,
            email: email,
          });
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
      } else {
        return {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid OTP',
        };
      }
    } else {
      throw new InternalServerErrorException();
    }
  }

  sendEmail(email: string, content: string) {
    const AWS_SES = new awsServices.SES(SES_CONFIG);
    const params = {
      Source: 'nexustechmyanmar@gmail.com',
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `OTP code is ${content}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `OTP code`,
        },
      },
    };
    return AWS_SES.sendEmail(params).promise();
  }

  private generateRandomNumber() {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
