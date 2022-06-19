
import { RedisClientType } from '@redis/client';
import * as redis from 'redis';

export class RedisConfig {
    public readonly host: string = "localhost";
    public readonly port: number = 6379;
    public readonly password: string = "";
    public client?: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>;

    constructor() {
        console.log("creating redis config");
        this.client = this.getClient();
        console.log("created redis config");
    }

    public getClient(): RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>> {
        console.log("creating redis client");
        return redis.createClient({
            url: `redis://${this.host}:${this.port}`
        });
    }

    public async connect() {
        console.log("connecting to redis");
        await this.client!!.connect();
        console.log("connected to redis");
    }

    public async disconnect() {
        await this.client!!.quit();
        console.log("disconnected from redis");
    }

}