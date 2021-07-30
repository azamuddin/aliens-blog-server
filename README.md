
# Blog Server 

## Database Configuration 

Before running this app or testing, make sure to create `config/config.json`. 

Here is an example of its content: 

```json 
{
  "development": {
    "username": "root",
    "password": "bismillah",
    "database": "aliens-blog",
    "host": "127.0.0.1",
    "dialect": "mysql", 
    "logging": false
  },
  "test": {
    "username": "root",
    "password": "bismillah",
    "database": "aliens-blog",
    "host": "127.0.0.1",
    "dialect": "mysql", 
    "logging": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## MySQL 

MySQL and PHPMyadmin service can be turned on with `docker-compose up`. 

MySQL using PORT 3306 and PHPMyadmin on 8080. 

If the ports conflict with ports on your local machine, you can change on .env `MYSQL_PORT` and `PMA_PORT`.

## Test 

Run `npm test`. 


## Regarding MySQL on Docker. 

I usually use MySQL official image through docker-compose, the `docker-compose.yml` is included in this repo
