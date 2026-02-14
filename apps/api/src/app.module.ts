import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { QueueModule } from './queue/queue.module';
import { RedisModule } from './redis/redis.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule,
    QueueModule,
    SaleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
