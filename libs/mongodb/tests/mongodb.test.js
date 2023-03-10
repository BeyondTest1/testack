const {MongoDB} = require('../');

var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

instance = undefined
mongodb_params = undefined
Dog = mongoose.model('Dog', new mongoose.Schema({ name: String, breed: String, age:Number }));

describe('MongoDB Unit Tests', function() {
  beforeAll(async () => {

    mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password",
      inMemory:true,
      fixtures_path: "./libs/mongodb/fixtures/"
    }
  });
  afterEach(async () => {
    if(instance){
      await instance.destroy();
    }
  });

  it('should create a MongoDB with inMemory database', async function() {
    instance = await new MongoDB.create(mongodb_params)
    expect(instance.host).toBe('127.0.0.1')
    await instance.destroy();
  });

  // it('should create a MongoDB with real database', async function() {
  //   instance = await new MongoDB.create({...mongodb_params, inMemory:false})
  //   expect(instance.port).toBe(27017)
  //   // await instance.destroy();
  // });

  it('should reset the database',  async function() {
    instance = await new MongoDB.create(mongodb_params);
    mongoose.connect(`${instance.DATABASE_URL}`,{useNewUrlParser: true, useUnifiedTopology: true});
    

    var dog1 = new Dog({ name: 'Snoop Doggy Dog'});

    await dog1.save();
    await expect(Dog.count()).resolves.toBe(1);
    await instance.reset();
    await expect(Dog.count()).resolves.toBe(0);
    await mongoose.connection.close()
    await instance.destroy();
    

  });

  it('should seed the database',  async function() {
    instance = await new MongoDB.create(mongodb_params);

    mongoose.connect(`${instance.DATABASE_URL}`,{useNewUrlParser: true, useUnifiedTopology: true});
    await instance.seed();
    await expect(Dog.count()).resolves.toBe(3);
    
    await mongoose.connection.close()
    await instance.destroy();
    
  });
});
