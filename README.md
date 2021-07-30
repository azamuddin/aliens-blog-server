
# Blog Server 

This is API server for https://github.com/azamuddin/alien-blog-ui (frontend)

## MySQL 

MySQL and PHPMyadmin service can be turned on with `docker-compose up`. 

MySQL using PORT 3306 and PHPMyadmin on 8080. 

If the ports conflict with ports on your local machine, you can change on .env `MYSQL_PORT` and `PMA_PORT`.

## Running

After MySQL service is up, you can start development server: 

```
DEBUG=aliens-server:* npm start
```

To change the server PORT, use `PORT` variable in `.env`

## Database Configuration 

Database configuration located in `config/config.json`

## Test 

Run `npm test`. 


## Regarding MySQL on Docker. 

I usually use MySQL official image through docker-compose, the `docker-compose.yml` is included in this repo
