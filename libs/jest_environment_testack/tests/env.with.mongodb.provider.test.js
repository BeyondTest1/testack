/**
* @jest-environment ./libs/jest_environment_testack/
* @jest-environment-options {"providers":[ {"provider": "MongoDB", "inMemory":true} ],"actions": [{"event": "test_start","provider": "MongoDB","method": "reset"}]}
*/

describe('environment with inMemory mongodb', function() {
    it('create and verify the instance', async function() {
        expect(global.testack.constructor.name).toBe("Testack")
    });  
});
  

