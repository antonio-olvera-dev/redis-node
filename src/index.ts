import { RedisConfig } from './RedisConfig';

async function start() {

    const redisConfig = new RedisConfig();
    await redisConfig.connect();
    await redisConfig.disconnect();

}

start();