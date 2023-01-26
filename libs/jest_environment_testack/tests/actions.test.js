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
          providers: [ {provider: "MongoDB"} ]}
          // async setup(Testack) {},
          // async teardown(Testack) {},  
        });

        jest.spyOn(testackEnv.global.testack.providers.mongodb, 'reset');
        global.console.warn = jest.fn();
        global.console.log = jest.fn();
    });
    
    test("reset should be called", async () => {
      testackEnv.opts.actions = {
        BeforeEach: [{
          provider: "MongoDB",
          action: "reset"
        }]
      };

      await testackEnv.setup();
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(1);
    });

    test("should not call 'reset' when BeforeEach is empty", async () => {
      testackEnv.opts.actions.BeforeEach = [];
      await testackEnv.setup();
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(0);
    });

    test("should not call reset AND message a warnning when action is incorrect", async () => {
      testackEnv.opts.actions = {
        BeforeEach: [{
          provider: "MongoDB",
          action: "incorrect action"
        }]
      };
      
      await testackEnv.setup();
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(0);
      expect(console.warn).toBeCalledTimes(1)
      expect(console.warn).toHaveBeenLastCalledWith("action 'incorrect action' is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!")
  
    });


    
//   it('create and verify the instance', function() {
//     const instance = new TestackEnvironment({});
//     expect(instance).toBeInstanceOf(TestackEnvironment);
//     expect(instance.global.testack).toBeInstanceOf(Testack);
//   });


});
