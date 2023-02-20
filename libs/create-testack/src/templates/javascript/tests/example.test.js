const { MongoMemoryServer } = require('mongodb-memory-server')
const  MongoDB  = require('testack-mongodb').MongoDB
const MongodbMemoryServer = require('mongodb-memory-server').default;

var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

var mongod, mongod_uri, mongodb_params, Dog

describe('TestackEnvironment Unit Tests', function() {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    mongod_uri = mongod.getUri();
    var MONGO_URI = mongod_uri.slice(0, mongod_uri.lastIndexOf('/')) + "/db";

    mongoose.connect(`${MONGO_URI}`,{useNewUrlParser: true, useUnifiedTopology: true});
    Dog = mongoose.model('Dog', new mongoose.Schema({ name: String, breed: String, age:Number }));

    mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password",        
      database: mongod.instanceInfo.dbName,
      port: mongod.instanceInfo.port,
      host: mongod.instanceInfo.ip
    }

  });
  
  afterAll(async () => {
    await mongoose.connection.close()
    await mongod.stop();
  });
    

  it('should create a MongoDB provider with the params', async function() {
    var instance = await new MongoDB.create(mongodb_params)
    expect(instance).toEqual(
      expect.objectContaining(mongodb_params)
    );
  });

  it('should reset the database',  function(done) {
    var dog1 = new Dog({ name: 'Snoop Doggy Dog'});
    
    dog1.save(async function (err) {
      if (err) return console.error(err);
      await expect(Dog.count()).resolves.toBe(1);      
      
      var instance = await new MongoDB.create(mongodb_params)
      await instance.reset();
      await expect(Dog.count()).resolves.toBe(0);
      done();
    });
  });

  it('should seed the database',  async function() {
    var instance = await new MongoDB.create(mongodb_params);
    await instance.seed();
    await expect(Dog.count()).resolves.toBe(3);
  });
});
