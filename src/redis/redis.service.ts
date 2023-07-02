import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common/cache';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async set(key: string, value: unknown, ttl: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async delete(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async get(key: string): Promise<unknown> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
