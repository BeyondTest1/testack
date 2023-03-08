# Testack
Testack is an integrated testing framework powered by Node.js that provides a complete testing solution for microservices applications, servers, and APIs regardless of your tech stack. This makes it easy for developers to test their code no matter what technologies they are using.


## Features
Testack provides the following features:

* End-to-end testing for microservices applications
* Server & API testing
* Built-in support for popular testing libraries like Jest
* Built-in support for popular databases like MongoDB
* Built-in support for popular broker messaging such as Kafka
* Customizable reporters for displaying test results


## Installation
For a new project, you can use the Testack wizard to configure everything for you. Simply run the following command:
`npm init testack@latest`

Answer a few questions about your preferred setup, including project name, project template, and database/message broker platforms, and Testack will handle the rest.

To install Testack for an existing project, you will need to install the relevant packages according to your tech stack.
For example, if you are using MongoDB as your database and would like to test your application with the Jest test framework, you will need to install the relevant packages:
`npm i --save-dev testack testack-mongodb jest-environment-testack`


## Usage
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
In the above example, it is assumed that you have a MongoDB in your tech stack and that you want to reset your database before each test. To make the example work, you will need to install the relevant packages that are relevant to your tech stack environment: `npm i --save-dev testack-mongodb jest-environment-testack` or you can use the npm init command that is shown above.

## Upcoming features
Auto-generated continuous integration pipelines (Jenkins, Github Actions)
Adding more providers for different databases and messaging brokers
Adding more provider actions (currently supporting reset and seed from 'fixtures' folder)
Support for more testing frameworks
Support for more programming languages

