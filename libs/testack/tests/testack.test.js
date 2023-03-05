const { MongoDB } = require('../../mongodb/dist');
// const { MongoDB } = require('testack-mongodb');


const Testack = require('../').default;
// const * as Testack = require('../dist/index.js').default;
// const TestackClient = require('testack/lib/core/client.js');
let testack;

let mongodb_params = {
  provider: "MongoDB",
  inMemory:true
}

describe('Testack Unit Tests', function() {
  afterEach(async () => {
    if(testack){
      await testack.destroy();
    }
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

  
  it('destroy inMem mongodb provider', async function() {
    let mongodb_params = {
      provider: "MongoDB",
      inMemory:true
    }

    testack = new Testack({
        providers: [ mongodb_params ]
      }
    );
    
    await testack.init()
    expect(testack.providers.mongodb).toMatchObject(mongodb_params);
    await testack.destroy()
  });

});
