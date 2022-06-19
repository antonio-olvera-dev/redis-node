import { DataManager } from './DataManager';

async function start() {

    const dataManager = DataManager;
    await dataManager.connect();
    await dataManager.disconnect();

}

start();