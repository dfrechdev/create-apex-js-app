#! /usr/bin/env node
const Library = require('./src/library.js');
const exececutionDirectory = __dirname;
const currentDirectory = process.cwd();
const templateName = 'javascript-starter';

// create library object
let library = new Library(exececutionDirectory, currentDirectory, templateName);

// parse the arguments
library.parseProgram();

// start asking qestions and creating the libary
library.create();
