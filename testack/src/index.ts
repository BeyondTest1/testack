import {MongoDB}  from "../../libs/mongodb";
// const { MongoDB }  = require('../../libs/mongodb');
// import * as widgets from '../libs/';
// import * as widgets from '..';
// let widgets = new Object();

// const widgets  = {"MongoDB":1}
// const widgets : { [key: string]: any } = {"MongoDB":1}
// var widgets = {""}
// 
const widgets = {"MongoDB": MongoDB}
type Config = {
    providers: object[];
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

  
  
export default class Testack {

  providers: any;

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
            
            // url = 'Tom', username = "whatsoever" 
        }: Config //{ name?: string; age?: number }

    ){
        this.providers = {};
        console.log("Testack constructor")

        providers.forEach( (provider:any) => {
            // element.product_desc = element.product_desc.substring(0,10);
            // var instance = Object.create(MongoDB.prototype);
            // instance.constructor.apply(instance, args);    
            // this.providers[provider["name"]] = instance;
            console.log(widgets)

            // var instance = Object.create(widgets[provider["name"]].prototype);
            // console.log("args to create object Testack: ", provider)
            // instance.constructor.apply(instance, provider);
            // this.providers[provider["name"]] = instance;
        });
        
    // ✅ Setting default values inside function body
    //   const { name = 'Tom', age } = obj; 


    
    // username = "2";
    // databases = ''

    // if(databases["mongodb"])
    //     this.databases["mongodb"] =  new MongoDB(url, username, password);        
  }

//   reset(): Boolean {
//     console.log('reset databases');
//     return true;
//   }
}
