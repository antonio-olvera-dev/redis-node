import { RedisClientType } from "redis";
import { logger, repositoryError } from "../shared/decorators";
import { UserI } from "./UserI";

export class UserRepository {

    private client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.client = client;
    }

    @logger(__filename)
    @repositoryError()
    public async getAll(): Promise<string[] | null> {
        const data: string[] | null = await this.client.lRange(`users`, 0, -1);
        return data;
    }

    @logger(__filename)
    @repositoryError()
    public async set(user: UserI): Promise<number | null> {
        const data: number = await this.client.rPush(`users`, JSON.stringify(user));
        return data;
    }

    @logger(__filename)
    @repositoryError()
    public async lSet(user: UserI, index: number): Promise<string | null> {
        const data: string = await this.client.lSet(`users`, index, JSON.stringify(user));
        return data;
    }

    @logger(__filename)
    @repositoryError()
    public async lRem(user: UserI): Promise<number | null> {
        const data: number = await this.client.lRem(`users`, 1, JSON.stringify(user));
        return data;
    }
}