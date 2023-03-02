const { MongoDB } = require('../../mongodb/dist');
// const { MongoDB } = require('testack-mongodb');


const Testack = require('../').default;
// const * as Testack = require('../dist/index.js').default;
// const TestackClient = require('testack/lib/core/client.js');
let testack;

describe('TestackEnvironment Unit Tests', function() {
  it('setting mongodb provider', async function() {
    let mongodb_params = {
      username:"username",
      password: "password",
      provider: "MongoDB",
    }

    testack = new Testack({
        providers: [ mongodb_params ]
      }
    );
    await testack.init()

    expect(testack.providers.mongodb).toMatchObject(   
      { 
        ...mongodb_params, 
        host: "127.0.0.1",
        port: 27017,

        
      });
  });

  it('should filter incorrect provider setting', async function() {
    testack = new Testack({
        providers: [ {
                provider: "IncorrectProvider",
            }
        ]
    });
    await testack.init()
    expect(Object.keys(testack.providers)).toHaveLength(0);

  });

  

});
