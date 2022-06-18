# redis-node

Install packages
```shell
yarn install
```

Run redis
```shell
docker-compose up 
```
or
```shell
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

Run server
```shell
yarn server
```

Show redis-stack
<br>
[http://localhost:8001/](http://localhost:8001/)


