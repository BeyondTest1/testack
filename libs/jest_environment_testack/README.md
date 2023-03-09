# jest-environment-testack

**[Testack](https://testackjs.org)** environment for Jest. Testack.js is an integrated test framework for performing automated end-to-end testing on web applications and websites, across all major browsers.

```
npm install jest-environment-testack
```

## Usage:
Update your [Jest configuration](https://jestjs.io/docs/configuration):

Testack can be used within a Jest environment by adding the following annotations to your test file:
```
/**
 * @jest-environment jest-environment-testack
 * @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true, "fixtures_path": "./fixtures"} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "reset"}]}
 */
```

Or, you can configure Testack within Jest by adding the following to your jest.config.js file:
```
{
  testEnvironment: 'jest-environment-testack',
  projectConfig: {
    testEnvironmentOptions: {
      providers: [ {provider: "MongoDB", "inMemory":true, "fixtures_path": "./fixtures"} ],
      actions: [{
        event: "setup",
        provider: "MongoDB",
        method: "reset"
      }]
    },
  }
}

```
In the above example, it is assumed that you have a MongoDB in your tech stack and that you want to reset your database before each test.


## jest test suite life cycle
setup
add_hook
start_describe_definition
add_test
finish_describe_definition
run_start
run_describe_start
hook_start
hook_success
test_fn_start
test_fn_success
test_done
run_describe_finish
run_finish
teardown


### `global.testack` instance

Available properties/methods:
- `.testack` - the Testack instance.
- `.providers.<provider>` - use the Testack [.provider API](https://v2.testackjs.org/api/providers/) to use the provider abilities;
- `.actions.<action>` - configure the provider's actions [.provider API](https://v2.testackjs.org/api/actions/);
