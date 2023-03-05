const TestackEnvironment = require('../index.js');
const Testack = require('../../testack').default;

describe('TestackEnvironment Unit Tests', function() {
  it('create and verify the instance', function() {
    const instance = new TestackEnvironment({projectConfig:{testEnvironmentOptions:{}}});
    expect(instance).toBeInstanceOf(TestackEnvironment);
    expect(Testack).toBeInstanceOf(Function);
    expect(instance.global.testack).toBeInstanceOf(Object);
    expect(instance.global.testack.constructor).toBeInstanceOf(Function);
  });


  it('setting mongodb provider', async function() {
    let mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password"
    }
    
    const instance = new TestackEnvironment({
      projectConfig:{
        testEnvironmentOptions: {
          providers: [ mongodb_params ]
        }
      },
    });
    await instance.global.testack.init()
    expect(Object.keys(instance.global.testack.providers)).toHaveLength(1);
    expect(instance.global.testack.providers.mongodb).toMatchObject(   
      { 
        ...mongodb_params, 
        host: "127.0.0.1",
        provider: "MongoDB",
        password: "password",
        port: 27017,
        provider: "MongoDB",
        user: ""
      });
  });




  it('should execute beforeEach reset method before each and every test', async function() {
    const instance = new TestackEnvironment({
      projectConfig:{
        testEnvironmentOptions: {
          providers: [ {provider: "MongoDB"} ],
          actions: [{
            event: "test_start",
            provider: "MongoDB",
            method: "reset"
          }]
        },
      }
    });

    await instance.global.testack.init()
    expect(Object.keys(instance.global.testack.providers)).toHaveLength(1);

    expect(instance.global.testack.providers.mongodb).toMatchObject({
        host: "127.0.0.1",
        port: 27017,
        provider: "MongoDB",
      })
  });



  it('should close the providers connections for inMemory mongoDB', async function() {
    let mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password",
      inMemory: true
    }
    
    const instance = new TestackEnvironment({
      projectConfig:{
        testEnvironmentOptions: {
          providers: [ mongodb_params ]
        }
      },
    });
    await instance.global.testack.init()
    expect(Object.keys(instance.global.testack.providers)).toHaveLength(1);
    await instance.global.testack.destroy()

    // expect(instance.global.testack.providers.mongodb).toEqual(
    //   expect.objectContaining({
    //     ...mongodb_params, 
    //     host: "localhost",
    //     provider: "MongoDB",
    //     password: "password",
    //     port: 27017,
    //     provider: "MongoDB",
    //     user: ""
    //   })
    // );
  });

  beforeAll(async () => {
    global.console.warn = jest.fn();
  })

});
