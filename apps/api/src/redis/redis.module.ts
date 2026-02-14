import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as RedMod } from '@nestjs-redis/client';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedMod.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('redis.host') ?? 'redis';
        const port = config.get<number>('redis.port') ?? 6379;

        return {
          options: {
            url: `redis://${host}:${port}`,
          },
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
