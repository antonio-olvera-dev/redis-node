import { RedisClientType } from "redis";
import { UserI } from "./UserI";

export class UserRepository {

    private client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.client = client;
    }


    public async getAll(): Promise<string | null> {

        const data: string | null = await this.client.lRange(`users`, 0, -1);
        return data;
    }

    public async set(user: UserI):  Promise<string | null>  {
        const data: string = await this.client.rPush(`users`, JSON.stringify(user));
        return data;
    }
}