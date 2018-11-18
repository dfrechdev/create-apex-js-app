const logSymbols = require('log-symbols');
const chalk = require('chalk');

/**
 * @exports logger
 * @description logging methods for the app creation
 */
module.exports = {
    logAppCreatedMsg,
    logWelcomeMsg,
    logSuccess,
    logError,
    logWarning,
    logInfo,
    log
};

function logAppCreatedMsg(app) {
    console.log(logSymbols.success, chalk.green(`created app "${app.name}" at "${app.getAppPath()}".\n`));

    console.log('Inside that directory you can run the following commands:\n');
    console.log(chalk.cyan('$ npm run dev'));
    console.log('Watches the source folder and bundles the app for development on every change.\n');
    console.log(chalk.cyan('$ npm run prod'));
    console.log('Bundles the app for production.\n');
    console.log(chalk.cyan('$ npm run doc'));
    console.log('Creates JSDoc documentation from the source files.\n');
    console.log(chalk.cyan('npm run build'));
    console.log('Bundles the app for production and creates the documentation.\n');
    console.log('We suggest that you begin by typing:\n');
    console.log(chalk.cyan('$ cd'), app.name);
    console.log(chalk.cyan('$ npm run dev\n'));
    console.log(chalk.green('Happy coding!'));
}

function logWelcomeMsg(app) {
    console.log('\n');
    console.log(chalk.cyan.bold('Create your JavaScript app for APEX!\n'));
    console.log(chalk.bold(logSymbols.info, 'app name: ') + chalk.cyan(app.name) + '\n');
}

function log(msg) {
    console.log(msg);
}
function logSuccess(msg) {
    console.log(logSymbols.success, msg);
}
function logInfo(msg) {
    console.log(logSymbols.info, msg);
}
function logWarning(msg) {
    console.log(logSymbols.warning, msg);
}
function logError(msg, err) {
    console.log(logSymbols.error, chalk.red(msg));
    err ? console.log(chalk.red(`${err.stack}`)) : null;
}
