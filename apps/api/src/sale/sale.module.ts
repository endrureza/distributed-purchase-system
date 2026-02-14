import { Module } from '@nestjs/common';
import { QueueModule } from '@/queue/queue.module';
import { RedisModule } from '@/redis/redis.module';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [RedisModule, QueueModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
