/**
* @jest-environment ./libs/jest_environment_testack/
* @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true, "fixtures_path": "./libs/create-testack/src/templates/javascript/fixtures/"} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "reset"}]}
*/

const {MongoDB}  = require('testack-mongodb');
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

var instance, Dog, db;


describe('environment with inMemory mongodb', function() {
    beforeAll(async () => {
        mongoose.connect(this.global.testack.providers.mongodb.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true});
        Dog = mongoose.model('Dog', new mongoose.Schema({ name: String, breed: String, age:Number }));
      })

      afterAll(async () => {
        await mongoose.connection.close()
      })
        
    it('should insert sample data into the database', async function() {
        await expect(Dog.count()).resolves.toBe(0);
        var dog1 = new Dog({ name: 'Snoop Doggy Dog'});
        await dog1.save();
        await expect(Dog.count()).resolves.toBe(1);
      });
    
      it('should reset the database before a test starts',  async function() {
        await expect(Dog.count()).resolves.toBe(0);
      });    
});
  

