// const assert = require('assert');
const TestackEnvironment = require('../dist/index.js').default;
const Testack = require('../../../testack').default;
// const Testack = require('testack');
// const { Testack }  = require('../../../testack');
// const * as Testack = require('../dist/index.js').default;

// const TestackClient = require('testack/lib/core/client.js');

describe('TestackEnvironment Unit Tests', function() {

    let testackEnv;

    beforeEach(() => {
      // Create a new instance of TestackEnvironment with different parameters for each test
      testackEnv = new TestackEnvironment({
        testEnvironmentOptions: {
          providers: [ {provider: "MongoDB"} ],
          actions: {
            BeforeEach: [{
              provider: "MongoDB",
              action: "reset"
            }]
          },
          // async setup(Testack) {},
          // async teardown(Testack) {},
  
        }
      });
        jest.spyOn(testackEnv.global.testack.providers.mongodb, 'reset');
    });
    
    test("reset should be called", async () => {
      await testackEnv.setup();
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalled();
    });
    
    
//   it('create and verify the instance', function() {
//     const instance = new TestackEnvironment({});
//     expect(instance).toBeInstanceOf(TestackEnvironment);
//     expect(instance.global.testack).toBeInstanceOf(Testack);
//   });


});
