import { Test } from '@nestjs/testing';
import { RedisToken } from '@nestjs-redis/client';
import { PRODUCT } from '@repo/shared/constants';
import type { RedisClientType } from 'redis';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('Flash Sale (integration)', () => {
  // biome-ignore lint/suspicious/noImplicitAnyLet: common app
  let app;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    redis = app.get(RedisToken());
  });

  afterAll(async () => {
    await redis.flushDb();
    await app.close();
  });

  beforeEach(async () => {
    await redis.flushDb();
    await redis.set('stock', PRODUCT.totalStock);
  });

  it('allows only one purchase per user', async () => {
    const userId = 'integration-user';

    const first = await request(app.getHttpServer())
      .post('/sale/buy')
      .send({ userId });

    expect(first.body.status).toBe('SUCCESS');

    const second = await request(app.getHttpServer())
      .post('/sale/buy')
      .send({ userId });

    expect(second.body.status).toBe('PURCHASED');
  });

  it('returns SOLD_OUT after stock is depleted', async () => {
    // simulate many users until stock runs out
    for (let i = 0; i < PRODUCT.totalStock; i++) {
      await request(app.getHttpServer())
        .post('/sale/buy')
        .send({ userId: `u-${i}` });
    }

    const res = await request(app.getHttpServer())
      .post('/sale/buy')
      .send({ userId: 'late-user' });

    expect(res.body.status).toBe('SOLD_OUT');
  });

  it('returns stock availability', async () => {
    const res = await request(app.getHttpServer()).get('/sale/stock');

    expect(res.body.isAvailable).toBe(true);
    expect(res.body.stock).toBe(PRODUCT.totalStock);
  });

  it('returns stock availability after purchase', async () => {
    const userId = 'integration-user';

    const first = await request(app.getHttpServer())
      .post('/sale/buy')
      .send({ userId });

    expect(first.body.status).toBe('SUCCESS');

    const second = await request(app.getHttpServer()).get('/sale/stock');

    expect(second.body.isAvailable).toBe(true);
    expect(second.body.stock).toBe(PRODUCT.totalStock - 1);
  });

  it('returns out of stock', async () => {
    for (let i = 0; i < PRODUCT.totalStock; i++) {
      await request(app.getHttpServer())
        .post('/sale/buy')
        .send({ userId: `u-${i}` });
    }

    const res = await request(app.getHttpServer()).get('/sale/stock');

    expect(res.body.isAvailable).toBe(false);
    expect(res.body.stock).toBe(0);
  });
});
