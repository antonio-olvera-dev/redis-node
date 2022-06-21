import { RedisClientType } from "redis";
import { UserI } from "./UserI";
import { UserRepository } from "./UserRepository";
import { logger, set } from "../shared/decorators";

export class UserCase {

    private repository: UserRepository;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.repository = new UserRepository(client);
    }

    @logger(__filename)
    public async getAll(): Promise<UserI[] | null> {

        const data: string[] | null = await this.repository.getAll();

        if (data != null) {
            return data.map(value => {
                return JSON.parse(value);
            });
        }

        return data;
    }

    @set()
    @logger(__filename)
    public async set(user: UserI) {

        const data: any = await this.repository.set(user);
        console.log(data);
    }

}