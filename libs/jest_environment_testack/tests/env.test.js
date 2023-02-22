/**
* @jest-environment ./libs/jest_environment_testack/
*/

describe('TestackEnvironment Unit Tests', function() {
    it('create and verify the instance', function() {
        expect(global.testack.constructor.name).toBe("Testack")
    });  
});
  
