"use strict";
exports.__esModule = true;
var testack_mongodb_1 = require("testack-mongodb");
// const { MongoDB }  = require('../../libs/mongodb');
// import * as widgets from '../libs/';
// import * as widgets from '..';
// let widgets = new Object();
// const widgets  = {"MongoDB":1}
// const widgets : { [key: string]: any } = {"MongoDB":1}
// var widgets = {""}
// 
// const widgets = {"MongoDB": MongoDB}
var widgets = { "MongoDB": testack_mongodb_1.MongoDB };
var Testack = /** @class */ (function () {
    function Testack(_a) {
        var _b = _a.providers, providers = _b === void 0 ? [] : _b, _c = _a.configPath, configPath = _c === void 0 ? "~/.example.config.js" : _c;
        var _this = this;
        this.providers = {};
        providers.forEach(function (provider) {
            if (provider["provider"] in widgets) {
                var instance = Object.create(widgets[provider["provider"]].prototype);
                instance.constructor(provider);
                _this.providers[provider["provider"].toLowerCase()] = instance;
            }
        });
    }
    return Testack;
}());
exports["default"] = Testack;
