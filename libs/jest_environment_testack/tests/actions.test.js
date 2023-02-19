const TestackEnvironment = require('../index.js');

describe('TestackEnvironment actions', function() {

    let testackEnv;
    let resetFunction;

    beforeEach(() => {
        global.console.warn = jest.fn();
        global.console.log = jest.fn();
    });
    test("should  call 'reset' when action is configured in actions", async () => {
      testackEnv = new TestackEnvironment({
        projectConfig: {
          testEnvironmentOptions: {
            providers: [ {provider: "MongoDB"} ],
            actions: [{
              event: "setup",
              provider: "MongoDB",
              method: "reset"
            }]
          },
        }
      });
      const resetFunction = jest.spyOn(testackEnv.global.testack.providers.mongodb, 'reset')
        .mockImplementation(() => Promise.resolve());;

      await testackEnv.handleTestEvent({name: "setup"});
      expect(resetFunction).toHaveBeenCalledTimes(1);
    });

    test(`should not call 'reset' when event is not configured`, async () => {
      testackEnv = new TestackEnvironment({
        projectConfig: {
          testEnvironmentOptions: {
            providers: [ {provider: "MongoDB"} ],
            actions: []
          },
        }
      });
      
      resetFunction = jest.spyOn(testackEnv.global.testack.providers.mongodb, 'reset');
      // await testackEnv[jestFunc](args);
      await testackEnv.handleTestEvent({name: "setup"});
      expect(resetFunction).toHaveBeenCalledTimes(0);
    });

    test("should not call 'reset' when action is configured with incorrect action", async () => {
      testackEnv = new TestackEnvironment({
        projectConfig: {
          testEnvironmentOptions: {
            providers: [ {provider: "MongoDB"} ],
            actions: [{
              event: "setup",
              provider: "MongoDB",
              method: "incorrect_method"
            }]
          }
        }
      });
      resetFunction = jest.spyOn(testackEnv.global.testack.providers.mongodb, 'reset');
      await testackEnv.handleTestEvent({name: "setup"});
      expect(resetFunction).toHaveBeenCalledTimes(0);
      expect(console.warn).toBeCalledTimes(1)
      expect(console.warn).toHaveBeenLastCalledWith(`action with method 'incorrect_method' not found in  'MongoDB' class. please verify your 'testEnvironmentOptions' configuration section!`);
    });
});
