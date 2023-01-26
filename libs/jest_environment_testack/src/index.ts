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
    this.opts.actions = this.opts.actions || {};
    this.opts.actions.BeforeEach = this.opts.actions.BeforeEach || [];
    this.opts.actions.BeforeAll = this.opts.actions.BeforeAll || [];
    this.opts.actions.AfterEach = this.opts.actions.AfterEach || [];
    this.opts.actions.BeforeAll = this.opts.actions.BeforeAll || [];
    

    // this.client = createNightwatchClient(this.opts);
    // this.global.jestNightwatch = this.client;
    this.global.testack = new Testack(<any>this.opts);

  }

  async setup() {
    // this.opts.autoStartSession = this.opts.autoStartSession || typeof this.opts.autoStartSession == 'undefined';
    for (const action of this.opts.actions!.BeforeEach || []) {
      
      let provider_name = action.provider?.toLowerCase();
      if (provider_name) {
        switch(action?.action) { 
          case "reset": { 
              this.global.testack.providers[provider_name].reset();
              break; 
          } 
          default: { 
             console.warn(`action '${action?.action}' is not recognized. please verify your 'actions' section in 'testEnvironmentOptions' section!`)
             break; 
          } 
       }                
      }
    }    
    // autoStartSession is true by default
    // if (this.opts.autoStartSession) {
    //   this.global.browser = await this.client.launchBrowser();
    // }
    // if (this.opts.baseUrl) {
    //   this.global.browser.baseUrl = this.opts.baseUrl;
    // }
    // if (typeof this.opts.setup == 'function') {
    //   await this.opts.setup.call(this.global, this.global.Testack);
    // }
    await super.setup();
  }

  async teardown() {
    
    await super.teardown();

    // if (typeof this.opts.teardown == 'function') {
    //   await this.opts.teardown.call(this.global, this.global.Testack);
    // }
  }


  async handleTestEvent(event:any, state:any) {
    if (event.name === "test_done") {
      // console.log(event.name);
      
    }
             
    // if (event.name === "test_start") {
    //     let testNames = [];
    //     let currentTest = event.test;
    //     while (currentTest) {
    //       testNames.push(currentTest.name);
    //       currentTest = currentTest.parent;
    //     }

    //     this.global.describeName = testNames[1]  
    //     this.global.testName = testNames[0]  
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
