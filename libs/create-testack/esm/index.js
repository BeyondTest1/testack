#!/usr/bin/env node
"use strict";
// const fs = require('fs-extra')
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const configstore_1 = __importDefault(require("configstore"));
const utils = __importStar(require("./utils"));
const yargs = require('yargs');
const inquirer = require('inquirer');
const { install, setRootDir } = require('lmify');
const usage = "\nUsage: testack -n <name>  -t <template> -d <databases> -b <brokers> \nExecute microservices tests\n";
const config = new configstore_1.default('testack', {}, { globalConfigPath: true });
const options = yargs.usage(usage)
    .option("n", { alias: "name", describe: "what is your project name", type: "string", demandOption: false })
    .option("t", { alias: "template", describe: "which language you'ld like to use", type: "string", demandOption: false })
    .option("d", { alias: "databases", describe: "which databases are used?", type: "array", demandOption: false })
    .option("b", { alias: "brokers", describe: "which brokers are used?", type: "array", demandOption: false })
    .help(true)
    .argv;
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const CURR_DIR = process.cwd();
var QUESTIONS = [
    {
        name: 'name',
        type: 'input',
        message: 'Project name:',
        // default: config.get('name'),
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                if (fs.existsSync(input))
                    return `\x1b[31mFolder\x1b[0m '${input}' \x1b[31malready exists.\x1b[0m Delete or use another project name.`;
                config.path = config.path.slice(0, config.path.lastIndexOf("config.json")) + input + '.json';
                return true;
            }
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
        when: () => !yargs.argv['name']
    },
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to generate?',
        // default: config.get('template') || "javascript",
        choices: CHOICES,
        when: () => !yargs.argv['template']
    },
    {
        name: 'databases',
        type: 'checkbox',
        message: 'What are your Databases?',
        // default: config.get('databases') || [],
        choices: [{ name: 'MongoDB' }, { name: 'Redis' }, { name: 'Elasticsearch' }],
        when: () => !yargs.argv['databases']
    },
    {
        name: 'brokers',
        type: 'checkbox',
        message: 'What are your Message Broker Platforms?',
        // default: config.get('brokers') || [],
        choices: [{ name: 'Apache Kafka' }, { name: 'RabbitMQ' }],
        when: () => !yargs.argv['brokers']
    }
];
inquirer.prompt(QUESTIONS).then(async (answers) => {
    // fs.outputJson(filename, {name: 'JP'})
    // .then(() => fs.readJson(filename))
    // .then(async(data:any) => {
    // console.log(data.name) 
    answers = Object.assign({}, answers, yargs.argv);
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const tartgetPath = path.join(CURR_DIR, projectName);
    config.set('name', answers['name']);
    config.set('path', tartgetPath);
    config.set('template', answers['template']);
    config.set('databases', answers['databases']);
    config.set('brokers', answers['brokers']);
    // creating the project folder if not exists
    if (!utils.createProject(tartgetPath)) {
        return;
    }
    // copy the content into the project directory
    utils.createDirectoryContents(templatePath, projectName);
    // install package.json dependencies
    setRootDir(tartgetPath);
    await install('.');
}).catch((err) => {
    console.error(err);
});
