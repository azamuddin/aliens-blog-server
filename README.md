
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
