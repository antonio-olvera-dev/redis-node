import { RedisClientType } from "redis";
import { UserI } from "./UserI";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "./UserRepository";

export class UserCase {

    private repository: UserRepository;

    constructor(client: RedisClientType<Record<string, never>, Record<string, never>, Record<string, never>>) {
        this.repository = new UserRepository(client);
    }

    public async getAll(): Promise<UserI[] | null> {
        try {

            console.log("--get---");
            const data: string | null = await this.repository.getAll();
            const users: UserI[] = [];

            if (data != null) {
                for (const userStr of data) {
                    users.push(JSON.parse(userStr))
                }
                return users;
            }

            return data;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async set(user: UserI) {
        try {
            console.log("--set---");
            this.addDates(user);
            this.addId(user);
            const data: any = await this.repository.set(user);
            console.log(data);
        } catch (error) {
            console.log(error);

        }
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