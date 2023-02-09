// const assert = require('assert');
const TestackEnvironment = require('../dist/index.js').default;
const Testack = require('../../../testack').default;
// const Testack = require('testack');
// const * as Testack = require('../dist/index.js').default;

// const TestackClient = require('testack/lib/core/client.js');

describe('TestackEnvironment Unit Tests', function() {
  it('create and verify the instance', function() {
    const instance = new TestackEnvironment({});
    expect(instance).toBeInstanceOf(TestackEnvironment);
    expect(instance.global.testack).toBeInstanceOf(Testack);
  });


  it('setting mongodb provider', function() {
    let mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password"
    }
    
    const instance = new TestackEnvironment({
      testEnvironmentOptions: {
        providers: [ mongodb_params ]
      }
    });

    expect(Object.keys(instance.global.testack.providers)).toHaveLength(1);
    expect(instance.global.testack.providers.mongodb).toEqual(
      expect.objectContaining({
        ...mongodb_params, 
        host: "localhost",
        provider: "MongoDB",
        password: "password",
        port: 27017,
        provider: "MongoDB",
        user: ""
      })
    );
  });




  it('should execute beforeEach reset method before each and every test', function() {
    const instance = new TestackEnvironment({
      testEnvironmentOptions: {
        providers: [ {provider: "MongoDB"} ],
        actions: [{
          event: "test_start",
          provider: "MongoDB",
          method: "reset"
        }]
      },
    });


    expect(Object.keys(instance.global.testack.providers)).toHaveLength(1);

    expect(instance.global.testack.providers.mongodb).toEqual(
      expect.objectContaining({
        host: "localhost",
        port: 27017,
        provider: "MongoDB",
      })
    );
  });

  //   await instance.setup();
  //   assert.strictEqual(instance.global.browser, undefined);
  //   assert.ok(instance.global.jestTestack);
  //   assert.strictEqual(typeof instance.global.jestTestack.launchBrowser, 'function');
  // });

  // it('test with baseUrl property', async function() {
  //   const instance = new TestackEnvironment({
  //     testEnvironmentOptions: {
  //       baseUrl: 'http://localhost'
  //     }
  //   });

  //   instance.client.launchBrowser = function() {
  //     return Promise.resolve({value: true});
  //   };

  //   await instance.setup();
  //   assert.strictEqual(instance.global.baseUrl, 'http://localhost');
  // });

  // it('test with setup option', function(done) {
  //   const instance = new TestackEnvironment({
  //     testEnvironmentOptions: {
  //       async setup(browser) {
  //         assert.deepStrictEqual(browser, {value: true});

  //         done();
  //       }
  //     }
  //   });

  //   instance.client.launchBrowser = function() {
  //     return Promise.resolve({value: true});
  //   };

  //   instance.setup().then(function() {

  //   }).catch(err => done(err));
  // });

  // it('test with teardown option', function(done) {
  //   const instance = new TestackEnvironment({
  //     testEnvironmentOptions: {
  //       async teardown(browser) {
  //         assert.deepStrictEqual(browser, {value: true});

  //         done();
  //       }
  //     }
  //   });

  //   instance.client.launchBrowser = function() {
  //     return Promise.resolve({value: true});
  //   };

  //   instance.setup().then(function() {
  //     return instance.teardown();
  //   }).catch(err => done(err));
  // });
});
