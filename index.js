#! /usr/bin/env node
const ApexJsApp = require('./src/ApexJsApp.js');

// clear console
process.stdout.write('\033c');

// create new app object
const executionPath = __dirname;
const currentPath = process.cwd();
let app = new ApexJsApp(executionPath, currentPath);

// parse command line arguments
app.setProgram();

// execute all steps to create the app
app.create();
