// import  { Testack } from '../../../src/index';
import NodeEnvironment from 'jest-environment-node';
import {TestEnvConfig} from '../../interfaces';
// const Testack = require('testack');
// import  Testack from 'testack'

// import {Testack} from "testack";
// import Testack from '../../../testack';
// export * from './mongodb/src/index';

// const Testack = require('../../../testack').default;
import Testack from '../../../testack/';


class TestackEnvironment extends NodeEnvironment {
	public opts: TestEnvConfig;
	public declare global: any;
  

  constructor(config: any) {
    super(config);

    this.opts = config.testEnvironmentOptions || {};
    this.opts.events = this.opts.events || {};

    this.opts.events.test_start = this.opts.events.test_start || [];
    this.opts.events.test_done = this.opts.events.test_done || [];
    this.opts.events.setup = this.opts.events.setup || [];
    this.opts.events.teardown = this.opts.events.teardown || [];


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
        

    // this.client = createNightwatchClient(this.opts);
    // this.global.jestNightwatch = this.client;
    this.global.testack = new Testack(<any>this.opts);

  }

  // async doActions(hook: string){
  //   for (const action of this.opts?.actions?.[hook] || []) {
  //     if (action?.provider) {
  //       switch(action?.action) { 
  //         case "reset": { 
  //             this.global.testack.providers[action?.provider].reset();
  //             break; 
  //         } 
  //         default: { 
  //            console.warn(`action '${action?.action}' in '${hook}' hook is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!`)
  //            break; 
  //         } 
  //      }                
  //     }
  //   }
  // }

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
  //   if (event?.name){
  //     const name = event?.name;
  //     for (const action of this.opts!.events?.[name] || []) {
  //       let providerName = action?.provider?.toLowerCase();
  //       let actionName = action?.action;
        
  //       if (providerName) {
          
  //         switch(actionName) { 
  //           case "reset": {
  //               this.global.testack.providers[providerName]?.reset();
  //               break; 
  //           } 
  //           default: { 
  //             console.warn(`action '${actionName}' in '${event.name}' event is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!`)
  //             break; 
  //           } 
  //       }                
  //     }
  //   }
  // }
  

  this.opts?.events?.[event?.name]?.forEach( (action:any) => {
    // for (const action of this.opts?.events?.[event?.name] || []) {
      let providerName = action?.provider?.toLowerCase();
      let actionName = action?.action;
      
      if (providerName) {
        
        switch(actionName) { 
          case "reset": {
              this.global?.testack?.providers[providerName]?.reset();
              break; 
          } 
          default: { 
            console.warn(`action '${actionName}' in '${event.name}' event is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!`)
            break; 
          } 
        }                
      }
    })
  

    // console.info(event.name);
    // if (event.name === "test_start") {
    //   await this.doActions("beforeEach") 
    // }
    // else if (event.name === "test_done") {
    //   await this.doActions("afterEach") 
    //   // console.log(event.name);
    // }

    // if (event.name === "test_fn_failure") {
    //     this.global.testStatus = "failure"
    // }else if (event.name === "test_fn_success") {
    //     this.global.testStatus = "success"
    // }
  // }
  }

}


export default TestackEnvironment;
