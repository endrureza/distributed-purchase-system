import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements OnModuleDestroy {
  constructor(@InjectQueue('purchase') private readonly queue: Queue) {}

  async enqueuePurchase(userId: string) {
    await this.queue.add('persist', { userId });
  }

  async onModuleDestroy() {
    await this.queue.close();
  }
}
