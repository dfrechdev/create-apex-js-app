#! /usr/bin/env node
const Library = require('./src/library.js');
const exececutionDirectory = __dirname;
const currentDirectory = process.cwd();

// clear the console
process.stdout.write('\033c');

// create library object
let library = new Library(exececutionDirectory, currentDirectory);

// parse the arguments
library.parseProgram();

// start asking qestions and creating the libary
library.create();
