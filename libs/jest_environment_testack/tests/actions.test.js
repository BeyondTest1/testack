// const assert = require('assert');
const TestackEnvironment = require('../dist/index.js').default;
// const Testack = require('../../../testack').default;
// const Testack = require('testack');
// const { Testack }  = require('../../../testack');
// const * as Testack = require('../dist/index.js').default;

// const TestackClient = require('testack/lib/core/client.js');

describe('TestackEnvironment events', function() {

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
    test("should  call 'reset' when action is configured in events", async () => {
      testackEnv.opts.events = {
        "setup": [{
          provider: "MongoDB",
          action: "reset"
        }]
      };

      await testackEnv.handleTestEvent({name: "setup"});
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(1);
    });

    test(`should not call 'reset' when event is not configured`, async () => {
      testackEnv.opts.events["setup"] = [];
      // await testackEnv[jestFunc](args);
      await testackEnv.handleTestEvent({name: "setup"});
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(0);
    });

    test("should not call 'reset' when action is configured with incorrect action", async () => {
      testackEnv.opts.events = {
        "setup": [{
          provider: "MongoDB",
          action: "incorrect action"
        }]
      };
      
      await testackEnv.handleTestEvent({name: "setup"});
      expect(testackEnv.global.testack.providers.mongodb.reset).toHaveBeenCalledTimes(0);
      expect(console.warn).toBeCalledTimes(1)
      expect(console.warn).toHaveBeenLastCalledWith(`action 'incorrect action' in 'setup' event is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!`)  
    });
});
