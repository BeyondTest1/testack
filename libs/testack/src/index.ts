import {MongoDB}  from "testack-mongodb";
// const { MongoDB }  = require('../../libs/mongodb');
// import * as widgets from '../libs/';
// import * as widgets from '..';
// let widgets = new Object();

// const widgets  = {"MongoDB":1}
// const widgets : { [key: string]: any } = {"MongoDB":1}
// var widgets = {""}
// 
// const widgets = {"MongoDB": MongoDB}

const widgets : { [key: string]: any } = {"MongoDB": MongoDB}
type Config = {
  providers: object[];
  configPath?: string;
};

type Providers = {
  [ key: string ]: MongoDB | any;
};

export default class Testack {
  providers: Providers = {};
  input_providers:any;
  constructor({ 
          providers = [], 
          configPath = "~/.example.config.js"
      }: Config) {
        this.input_providers= providers;
    }

    public async init() {
      for (const provider of this.input_providers) {
        if (provider["provider"] in widgets) {
          const instance = await widgets[provider["provider"]].create(provider);
          this.providers[provider["provider"].toLowerCase()] = instance;
        }
      }
    }
  }
