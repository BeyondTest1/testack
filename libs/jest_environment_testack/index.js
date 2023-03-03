// import NodeEnvironment from 'jest-environment-node';
// import {TestEnvConfig} from 'testack-interfaces';
// import Testack from 'testackjs';

// const TestEnvConfig = require('testack-interfaces');
const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const Testack = require('testackjs').default;



class TestackEnvironment extends NodeEnvironment {
  opts = undefined;
  actions = {};

  constructor(config, context) {
    super(config, context);
    this.opts = config.testEnvironmentOptions || config.projectConfig?.testEnvironmentOptions || {};
    this.opts.actions = this.opts.actions || [];

    // group actions by action event
    if(this.opts?.actions)
      this.opts.actions.map((action) => {
        if (!this.actions[action.event]) {
          this.actions[action.event] = [];
        }
        this.actions[action.event].push({provider: action.provider, method: action.method});
      });
    this.global.testack = new Testack(this.opts);
  }

  async handleTestEvent(event, state) {    
  if( !event?.name) return;
    this.actions[event.name]?.map(async (action) => {
      switch(action.method) { 
        case "reset": {
            await this.global?.testack?.providers[action.provider.toLowerCase()]?.reset();
            break; 
        } 
        case "seed": {
          await this.global?.testack?.providers[action.provider.toLowerCase()]?.seed();
          break; 
        } 
      default: { 
          console.warn(
          `action with method '${action.method}' not found in  '${action.provider}' class. please verify your 'testEnvironmentOptions' configuration section!`
          );
          break; 
        } 
      }
    })
  }
  async setup() {
    await super.setup();
    await this.global.testack.init()
  }

  async teardown() {
    await this.global.testack.destroy();
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = TestackEnvironment;

