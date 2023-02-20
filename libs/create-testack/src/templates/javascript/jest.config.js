module.exports = {
  testEnvironment: 'jest-environment-testack',
  testEnvironmentOptions: {
    providers: [ 
      {
        provider: "MongoDB"
      } 
    ],
    actions: [
      {
        event: "test_start",
        provider: "MongoDB",
        method: "reset"
      }
    ]
  }
};