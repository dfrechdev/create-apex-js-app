#! /usr/bin/env node
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const scriptName = process.argv[2];

switch (scriptName) {
    case 'doc':
        console.log(logSymbols.info, chalk.cyan('Generating documentation'));
        break;
    case 'dev':
        console.log(logSymbols.info, chalk.cyan('Starting development bundeling'));
        break;
    case 'prod':
        console.log(logSymbols.info, chalk.cyan('Starting production bundeling'));
        break;
    case 'build':
        console.log(logSymbols.info, chalk.cyan('Starting production build'));
        break;
    default:
        null;
}
