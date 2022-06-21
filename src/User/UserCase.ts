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
        const users: UserI[] = [];

        if (data != null) {
            for (const userStr of data) {
                users.push(JSON.parse(userStr))
            }
            return users;
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