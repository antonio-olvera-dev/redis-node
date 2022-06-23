import { DataManager } from './DataManager';
import { UserI } from './User/UserI';

async function start() {

    const dataManager = DataManager;
    await dataManager.connect();

    const user: UserI = {
        name: "Antonio",
        email: "antonio@gmail.com",
        password: "1234"
    }

    const set = await DataManager.getUser().set(user);
    const users = await DataManager.getUser().getAll();
    
    const length = users?.length ? users.length : 0;
    await updates(users, length);
    await remove(length, users); 
 
    await dataManager.disconnect();
}

start();

async function remove(length: number, users: UserI[] | null) {
    if (length > 4) {
        await DataManager.getUser().delete(users!![4]);
    }
}

async function updates(users: UserI[] | null, length: number) {
    const newUser = { ...users![0] };
    newUser.name = "Pepe";
    await DataManager.getUser().updateById(newUser);

    if (length > 1) {
        const newUser2 = { ...users![1] };
        newUser2.name = "Juan";
        await DataManager.getUser().updateByIndex(newUser2, 1);
    }
}
