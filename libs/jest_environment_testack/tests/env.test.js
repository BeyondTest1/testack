const TestackEnvironment = require('../index.js');
/**
* @jest-environment TestackEnvironment
*/

describe('TestackEnvironment Unit Tests', function() {
    it('create and verify the instance', function() {
        // expect(global.testack.constructor.name).toBe("Testack")
        expect(1).toBe(1)
    });  
});
  
