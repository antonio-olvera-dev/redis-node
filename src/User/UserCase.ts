import { RedisClientType } from "redis";
import { UserI } from "./UserI";
import { UserRepository } from "./UserRepository";
import { logger, set, update } from "../shared/decorators";

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

    @update()
    @logger(__filename)
    public async updateById(userToUpdate: UserI) {

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
            const data: any = await this.repository.lSet(userToUpdate, index);
            console.log(data);
            return;
        }
    }

    @update()
    @logger(__filename)
    public async updateByIndex(userToUpdate: UserI, index: number) {

        const data: any = await this.repository.lSet(userToUpdate, index);
        console.log(data);
        return;
    }

    @logger(__filename)
    public async delete(userToUpdate: UserI) {

        const data: any = await this.repository.lRem(userToUpdate);
        console.log(data);
        return;
    }    

}