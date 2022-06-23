import { RedisClientType } from "redis";
import { UserI } from "./UserI";
import { UserRepository } from "./UserRepository";
import { logger, remove, set, update } from "../shared/decorators";

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
    public async set(user: UserI): Promise<number | null> {

        const data: number | null = await this.repository.set(user);
        return data;
    }

    @update()
    @logger(__filename)
    public async updateById(userToUpdate: UserI): Promise<string | null> {

        const allUser: UserI[] | null = await this.getAll();

        if (allUser != null) {

            let index: number = 0;

            for (let i = 0; i < allUser.length; i++) {
                const user = allUser[i];
                if (user.id === userToUpdate.id) {
                    index = i;
                    break;
                }
            }
            const data: string | null = await this.repository.lSet(userToUpdate, index);

            return data;
        }

        return null;
    }

    @update()
    @logger(__filename)
    public async updateByIndex(userToUpdate: UserI, index: number): Promise<string | null> {

        const data: string | null = await this.repository.lSet(userToUpdate, index);
        return data;
    }

    @remove()
    @logger(__filename)
    public async delete(userToUpdate: UserI): Promise<number | null> {

        const data: number | null = await this.repository.lRem(userToUpdate);
        return data;
    }

}