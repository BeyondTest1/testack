// import  { Testack } from '../../../src/index';
import NodeEnvironment from 'jest-environment-node';
// const Testack = require('testack');
// import  Testack from 'testack'

// import {Testack} from "testack";
// import Testack from '../../../testack';
// export * from './mongodb/src/index';

var Testack = require('../../../testack').default;

class TestackEnvironment extends NodeEnvironment {
	public opts: any;
	public global: any;
  

  constructor(config: any) {
    super(config);
    this.opts = config.testEnvironmentOptions || {};

    // this.client = createNightwatchClient(this.opts);
    // this.global.jestNightwatch = this.client;
    this.global.testack = new Testack(this.opts);

  }

  async setup() {
    this.opts.autoStartSession = this.opts.autoStartSession || typeof this.opts.autoStartSession == 'undefined';

      // {
      //   providers: [
      //     {name: "mongodb"}
      //   ]
      // }
      // );

    // autoStartSession is true by default
    // if (this.opts.autoStartSession) {
    //   this.global.browser = await this.client.launchBrowser();
    // }

    // if (this.opts.baseUrl) {
    //   this.global.browser.baseUrl = this.opts.baseUrl;
    // }

    if (typeof this.opts.setup == 'function') {
      await this.opts.setup.call(this.global, this.global.Testack);
    }
  }

  async teardown() {
    await super.teardown();

    if (typeof this.opts.teardown == 'function') {
      await this.opts.teardown.call(this.global, this.global.Testack);
    }
  }
}

export default TestackEnvironment;
