# Testack MongoDB
Testack MongoDB is a class that provides logic for performing actions on a MongoDB database.

# Usage
To use Testack MongoDB, first create an instance with the desired parameters:

mongodb_params = {
    provider: "MongoDB",
    username:"username",
    password: "password",
    inMemory:true,
    fixtures_path: "./libs/mongodb/fixtures/"
}

const instance = await new MongoDB.create(mongodb_params)

```

Once you have an instance, you can perform various actions on the database:

```
// Reset the database by cleaning all data
await instance.reset();

// Seed the database with data from the fixtures folder
await instance.seed();

// Destroy the instance
instance.destroy();
```


## Options
The following options can be specified when creating a Testack MongoDB instance:

| Name| Type | Description | Default |
|:--- | :--- | :--- | :---: |
| **`provider`** | String  | Provider name. | `MongoDB` |
| **`username`** | String  | Username for the connection. | none |
| **`password`** | String  | Password for the connection. | none |
| **`inMemory`** | Boolean  | Set this to true when you want to create in-Memory mongodb server | `false` |
| **`fixtures_path`** | String  | Directory to your fixtures folder | `./fixtures` |


## Actions

The following actions can be performed on a Testack MongoDB instance:

| Name| Type | Description | 
|:--- | :--- | :--- | :---: |
| **`.reset`** | Function  | Reset the database by cleaning all data |
| **`.seed`** | Function  | Seed the database with data from the fixtures folder |
| **`.destroy`** | Function  | Destroy the instance |

Note: the reset action will delete all data in the database, so use it with caution.
