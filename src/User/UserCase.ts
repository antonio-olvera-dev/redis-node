import { RedisClientType } from "redis";
import { UserI } from "./UserI";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "./UserRepository";
import { logger } from "../shared/decorators";

export class UserCase {

    private repository: UserRepository;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.repository = new UserRepository(client);
    }

    @logger()
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

    @logger()
    public async set(user: UserI) {

        this.addDates(user);
        this.addId(user);
        const data: any = await this.repository.set(user);
        console.log(data);
    }

    private addDates(object: any) {
        const date = new Date();
        object.createdAt = date;
        object.updatedAt = date;
    }

    private addId(object: any) {
        object.id = uuidv4();
    }

}