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

    await DataManager.getUser().set(user);
    const users = await DataManager.getUser().getAll();

    const newUser = { ...users![0] };
    newUser.name = "Pepe";
    await DataManager.getUser().updateById(newUser);

    await dataManager.disconnect();
}

start();