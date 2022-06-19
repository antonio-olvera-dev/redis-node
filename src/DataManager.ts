import { RedisClientType } from "redis";
import { RedisConfig } from "./RedisConfig";

export class DataManager {

    private static redisConfig?: RedisConfig;
    private static client?: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>;

    public static async connect() {
        if (!this.client || !this.redisConfig) {
            this.redisConfig = new RedisConfig();
            this.client = this.redisConfig.client;
            await this.redisConfig.connect();
        }
    }

    public static async disconnect() {
        if (this.redisConfig && this.client) {
            await this.redisConfig.disconnect();
        }
    }

}