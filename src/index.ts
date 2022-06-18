import * as redis from 'redis';

async function start() {


    const client: any = redis.createClient({
        url: 'redis://localhost:6379'
    })

    await client.connect()

}

start();