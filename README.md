# Testack
Testack is an integrated testing framework powered by Node.js. It provides a complete testing solution for microservices applications, servers, and APIs. With its flexible API, you can create a wide range of test scenarios and gain valuable insights into the quality of your code.

## Features
Testack provides the following features:

* End-to-end testing for microservices applications
* Server testing
* API testing
* Flexible and customizable API for creating test scenarios
* Built-in support for popular testing libraries like Mocha and Jest
* Integration with popular testing tools like Supertest and Sinon
* Customizable reporters for displaying test results
* Configuration options for controlling test behavior and output

## Installation
To install Testack, run the following command:
``npm init testack@latest my-project``

and answer a few questions about your preferred setup:
What is your Language - Test Runner setup?
Where do you want to run your e2e tests?
Where you'll be testing on?
Where do you plan to keep your end-to-end tests?
What is the base_url of your project?

## Usage
Testack can also be used within a Jest environment by adding the following annotations to your test file:
```
/**
 * @jest-environment jest-environment-testack
 * @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true, "fixtures_path": "./fixtures"} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "seed"}]}
 */
```

In addition, you can add the following to your jest.config.js file to configure Testack within Jest:
```
{
  testEnvironment: 'jest-environment-testack',
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
}
```