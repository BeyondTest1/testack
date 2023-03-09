# Testack
Testack is an integrated testing framework powered by Node.js that provides a complete testing solution for microservices applications, servers, and APIs regardless of your tech stack. This makes it easy for developers to test their code no matter what technologies they are using.


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

Assuming you have MongoDB in your technology stack and want to reset the database before each test, the example provided in the previous section can be used to configure Testack within Jest. For more information on the Jest environment for Testack, please refer to the [Jest Envitonment For Testack](https://github.com/BeyondTest1/testack/tree/main/libs/jest_environment_testack) documentation.

## Database and Message Broker Providers
Testack currently supports [MongoDB](https://github.com/BeyondTest1/testack/tree/main/libs/mongodb). 
Support for RabbitMQ, Apache Kafka, PostgreSQL, Redis, MySQL, and MS SQL Server is planned for the future.

## Upcoming features
Auto-generated continuous integration pipelines (Jenkins, Github Actions)
Adding more providers for different databases and messaging brokers
Adding more provider actions (currently supporting reset and seed from 'fixtures' folder)
Support for more testing frameworks
Support for more programming languages

