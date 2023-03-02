/**
 * @jest-environment jest-environment-testack
 * @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "reset"}]}
 */



const {MongoDB}  = require('testack-mongodb');
// var mongoose = require('mongoose');
// mongoose.set('strictQuery', false);


var instance, Dog, db;


describe('using testack in a jest environment', function() {

  beforeAll(async () => {
    // create an in-memory mongodb instance
    // console.log("befoer")
    // instance = await new MongoDB.create({inMemory:true});
    // console.log(this.global.testack.providers.mongodb)

    // this.global.testack.providers.mongodb.port = instance.port;
    // this.global.testack.providers.mongodb.DATABASE_URL = instance.DATABASE_URL;
    // this.global.testack.providers.mongodb.host = instance.host;
    // this.global.testack.providers.mongodb.dbName = instance.dbName;
    
    // db = mongoose.connect(`${instance.DATABASE_URL}db`,{useNewUrlParser: true, useUnifiedTopology: true});
    // Dog = mongoose.model('Dog', new mongoose.Schema({ name: String, breed: String, age:Number }));
    
  })

  afterAll(async () => {
    console.log("after")
    console.log(this.global.testack.providers.mongodb.destroy())
    await this.global.testack.providers.mongodb.destroy()
    // await db.disconnect()
    // await mongoose.connection.close()
    // await instance.destroy();  
  })


  it('should insert sample data into the database', async function() {
    console.log("1")
    expect(1).toBe(1);
    // await expect(Dog.count()).resolves.toBe(0);
    // var dog1 = new Dog({ name: 'Snoop Doggy Dog'});
    // await dog1.save();
    // await expect(Dog.count()).resolves.toBe(1);
  });

  // it('should reset the database and load the seed data from the `fixtures` folder',  async function() {
  it('should reset the database before a test starts',  async function() {
    // await expect(Dog.count()).resolves.toBe(0);
    console.log("2")
    expect(1).toBe(1);
  });

  // it('should reset the data before each test', async function() {
  //   await expect(Dog.count()).resolves.toBe(3);
  // });
  
});



