import {MongoDB}  from "../../libs/mongodb";
// const { MongoDB }  = require('../../libs/mongodb');
// import * as widgets from '../libs/';
// import * as widgets from '..';
// let widgets = new Object();

// const widgets  = {"MongoDB":1}
// const widgets : { [key: string]: any } = {"MongoDB":1}
// var widgets = {""}
// 
// const widgets = {"MongoDB": MongoDB}
const widgets : { [key: string]: Function } = {"MongoDB": MongoDB}
type Config = {
    providers: Object[];
    configPath?: string;
    
    // databases?: {
    //     mongodb?: {
    //         url?: string;
    //         username?: string;
    //         password?: string;                  
    //     }
    //     postegresql?: {
    //         url?: string;
    //         username?: string;
    //         password?: string;                  
    //     }
    // };
  };

  type Providers = {
    // mongodb: MongoDB;
    [ key: string ]: MongoDB | any;

  };
  
  
export default class Testack {

  providers: Providers = {};



// databases: new Array();
// function f({callback: {name = "cbFunction", params = "123"} = {}} = {}) {

//   constructor({
//     databases = [],
//     username = undefined,
//     password = undefined,
//     config = './testack.json'
//   }={})

// const laptops = [
//     {
//       year: 2018,
//       os: 'OSX',
//       sellerZipCodes: ['10010', '07302'],
//     },
//     {
//       year: 2015,
//       os: 'Ubuntu',
//       sellerZipCodes: ['07030'],
//     },
//   ];
//   const [
//     {
//       sellerZipCodes: [, secondZipCode],
//     },
//   ] = laptops;
  
//   console.log(secondZipCode); // '07302'
    constructor(
        { 
            providers = [], 
            configPath = "~/.example.config.js"
        }: Config //{ name?: string; age?: number }

    ){
        

        providers.forEach( (provider:any) => {
            var instance = Object.create(widgets[provider["name"]].prototype);
            instance.constructor(provider);
            this.providers[provider["name"].toLowerCase()] = instance
        });
        
      }
    // ✅ Setting default values inside function body
    //   const { name = 'Tom', age } = obj; 


    
  }
