# jest-environment-testack

`jest-environment-testack` is a package that allows you to use **[Testack](https://github.com/BeyondTest1/testack)**, an integrated testing framework powered by Node.js, with Jest. Testack provides a complete testing solution for microservices applications, servers, and APIs, regardless of the technologies you are using.

**[Testack](https://github.com/BeyondTest1/testack)** is an integrated testing framework powered by Node.js that provides a complete testing solution for microservices applications, servers, and APIs regardless of your tech stack. This makes it easy for developers to test their code no matter what technologies they are using.

To use Testack with Jest, you can install the `jest-environment-testack` package using npm:
```
npm install jest-environment-testack
```

## Usage:
Update your [Jest configuration](https://jestjs.io/docs/configuration):

You can then update your Jest configuration to use Testack. There are two ways to do this:
1. Add the following annotations to your test file:
```
/**
 * @jest-environment jest-environment-testack
 * @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true, "fixtures_path": "./fixtures"} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "reset"}]}
 */
```

2. Add the following code to your Jest configuration file (jest.config.js):
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


Testack provides a global.testack instance that you can use to access its properties and methods. Some of the available properties and methods include:
- `.testack` - the Testack instance.
- `.providers.<provider>` - use the Testack `.provider` API to use the provider abilities;
- `.actions.<action>` - configure the provider's actions `.actions` API;


During the Jest test suite lifecycle for Testack, various stages occur, such as setup, add_hook, start_describe_definition, add_test, finish_describe_definition, run_start, run_describe_start, hook_start, hook_success, test_fn_start, test_fn_success, test_done, run_describe_finish, run_finish, and teardown. Testack executes your provider's actions on selected actions that you configure.



