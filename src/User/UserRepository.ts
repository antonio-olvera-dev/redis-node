import { RedisClientType } from "redis";
import { logger, repositoryError } from "../shared/decorators";
import { UserI } from "./UserI";

export class UserRepository {

    private client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.client = client;
    }

    @logger()
    @repositoryError()
    public async getAll(): Promise<string[] | null> {
        const data: string[] | null = await this.client.lRange(`users`, 0, -1);
        return data;
    }

    @logger()
    @repositoryError()
    public async set(user: UserI): Promise<number | null> {
        const data: number = await this.client.rPush(`users`, JSON.stringify(user));
        return data;
    }
}