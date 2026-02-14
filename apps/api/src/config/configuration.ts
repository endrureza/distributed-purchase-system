export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  redis: {
    host: process.env.REDIS_HOST ?? 'redis',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
});
