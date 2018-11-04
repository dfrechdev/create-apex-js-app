#! /usr/bin/env node
const Library = require("./src/library.js");
const fileUtil = require("./src/fileUtil");
const npmUtil = require("./src/npmUtil");

// create library object
let library = new Library(__dirname, process.cwd(), "javascript-starter");

// parse the arguments
library.parseProgram();

// start asking qestions and creating the libary
library.create();
