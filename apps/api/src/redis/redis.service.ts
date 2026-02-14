import { Injectable, type OnModuleInit } from '@nestjs/common';
import { InjectRedis } from '@nestjs-redis/client';
import { PRODUCT } from '@repo/shared/constants';
import type { RedisClientType } from 'redis';
import { PURCHASE_LUA } from './purchase.lua';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(@InjectRedis() private readonly client: RedisClientType) {}

  async onModuleInit() {
    const exists = await this.client.exists('stock');
    if (!exists) {
      await this.client.set('stock', PRODUCT.totalStock.toString());
    }
  }

  async attemptPurchase(userId: string) {
    return this.client.eval(PURCHASE_LUA, {
      keys: ['stock', `user:${userId}`],
      arguments: [],
    });
  }

  async hasPurchased(userId: string) {
    return this.client.exists(`user:${userId}`);
  }

  async getStock(): Promise<number> {
    return Number(await this.client.get('stock'));
  }
}
