import NodeEnvironment from 'jest-environment-node';
import {TestEnvConfig} from 'testack-interfaces';
import Testack from 'testackjs';

// export * from './mongodb/src/index';
// const Testack = require('../../../testack').default;
// export default class TestackEnvironment implements NodeEnvironment {

class TestackEnvironment extends NodeEnvironment {
	public opts: TestEnvConfig;
	public declare global: any;
  private actions: any = {};
  
  // constructor(config: Config.ProjectConfig, options: EnvironmentContext = {}) {

  constructor(config: any={}, options: any={}) {
    super(config,options);

    this.opts = config?.testEnvironmentOptions || {};
    this.opts.actions = this.opts.actions || [];

    // group actions by action event
    this.opts?.actions?.map((action:any) => {
      if (!this.actions[action.event]) {
        this.actions[action.event] = [];
      }
      this.actions[action.event].push({provider: action.provider, method: action.method});
    });

    // this.opts.events.test_start = this.opts.events.test_start || [];
    // this.opts.events.test_done = this.opts.events.test_done || [];
    // this.opts.events.setup = this.opts.events.setup || [];
    // this.opts.events.teardown = this.opts.events.teardown || [];
    // this.opts.events.add_hook = this.opts.events.add_hook || [];
    // this.opts.events.start_describe_definition = this.opts.events.start_describe_definition || [];
    // this.opts.events.add_test = this.opts.events.add_test || [];
    // this.opts.events.finish_describe_definition = this.opts.events.finish_describe_definition || [];
    // this.opts.events.run_start = this.opts.events.run_start || [];
    // this.opts.events.run_describe_start = this.opts.events.run_describe_start || [];
    // this.opts.events.hook_start = this.opts.events.hook_start || [];
    // this.opts.events.hook_success = this.opts.events.hook_success || [];
    // this.opts.events.test_fn_start = this.opts.events.test_fn_start || [];
    // this.opts.events.test_fn_success = this.opts.events.test_fn_success || [];    
    // this.opts.events.run_describe_finish = this.opts.events.run_describe_finish || [];
    // this.opts.events.run_finish = this.opts.events.run_finish || [];
        
    this.global.testack = new Testack(<any>this.opts);
  }



  // async setup() {
  //   await this.doActions("beforeAll")
  //   // this.opts.autoStartSession = this.opts.autoStartSession || typeof this.opts.autoStartSession == 'undefined';

  //   // if (typeof this.opts.setup == 'function') {
  //   //   await this.opts.setup.call(this.global, this.global.Testack);
  //   // }
  //   await super.setup();
  // }

  // async teardown() {
  //   await this.doActions("afterAll") 
  //   await super.teardown();

  //   // if (typeof this.opts.teardown == 'function') {
  //   //   await this.opts.teardown.call(this.global, this.global.Testack);
  //   // }
  // }

  async handleTestEvent(event:any, state:any) {    
  if( !event?.name) return;
    this.actions[event.name]?.map((action:any) => {
      switch(action.method) { 
        case "reset": {      
            this.global?.testack?.providers[action.provider.toLowerCase()]?.reset();
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
}

module.exports = TestackEnvironment;

// export = TestackEnvironment;
// export default TestackEnvironment;
