const Testack = require('../').default;
// const Testack = require('testack');
// const { Testack }  = require('../../../testack');
// const * as Testack = require('../dist/index.js').default;

// const TestackClient = require('testack/lib/core/client.js');

describe('TestackEnvironment Unit Tests', function() {
  it('setting mongodb provider', function() {
    let mongodb_params = {
      provider: "MongoDB",
      username:"username",
      password: "password"
    }

    const testack = new Testack({
        providers: [ mongodb_params ]
      }
    );
    expect(Object.keys(testack.providers)).toHaveLength(1);
    expect(testack.providers.mongodb).toEqual(
      expect.objectContaining(
        {
          ...mongodb_params, 
          host: "localhost",
          provider: "MongoDB",
          password: "password",
          port: 27017,
          provider: "MongoDB",
          user: ""
        }
      )
    );
  });

  it('should filter incorrect provider setting', async function() {
    const testack = new Testack({
        providers: [ {
                provider: "IncorrectProvider",
            } 
        ]
    });
    expect(Object.keys(testack.providers)).toHaveLength(0);
  });
});
