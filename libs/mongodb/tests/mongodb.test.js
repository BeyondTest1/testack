const MongoDB = require('../').MongoDB;
const { MongoMemoryServer } = require('mongodb-memory-server')

var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongod= undefined
mongod_uri = undefined
mongodb_params = undefined
Dog = undefined
describe('TestackEnvironment Unit Tests', function() {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    mongod_uri = mongod.getUri();
    MONGO_URI = mongod_uri.slice(0, mongod_uri.lastIndexOf('/')) + "/db";    

    await mongoose.connect(`${MONGO_URI}`,{useNewUrlParser: true, useUnifiedTopology: true});
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
    

  it('should create a MongoDB provider with the params', function() {
    instance = new MongoDB(mongodb_params)
    expect(instance).toEqual(
      expect.objectContaining(mongodb_params)
    );
  });

  it('should reset the database',  function(done) {
    var dog1 = new Dog({ name: 'Snoop Doggy Dog'});
    
    dog1.save(async function (err, user1) {
      if (err) return console.error(err);
      await expect(Dog.count()).resolves.toBe(1);      
      
      instance = new MongoDB(mongodb_params)
      await instance.reset();
      await expect(Dog.count()).resolves.toBe(0);
      done();
    });
  });

  it('should seed the database',  async function() {
    instance = new MongoDB(mongodb_params);
    await instance.seed();
    await expect(Dog.count()).resolves.toBe(3);
  });
});
