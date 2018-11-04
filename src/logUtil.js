const logSymbols = require("log-symbols");
const chalk = require("chalk");

module.exports = {
    logLibraryCreatedMsg,
    logWelcomeMsg,
    logSuccess,
    logError,
    logWarning,
    logInfo,
    log
};

/**
 * @function logLibraryCreatedMsg
 * @param {*} library - Library object
 */
function logLibraryCreatedMsg(library) {
    console.log(logSymbols.success, chalk.green(`created library "${library.name}" at "${library.getLibraryPath()}".\n`));

    console.log("Inside that directory you can run the following commands:\n");
    console.log(chalk.cyan("$ npm run doc"));
    console.log("Creates the documentation from your source files in the distribution folder.\n");
    console.log(chalk.cyan("$ npm run dev"));
    console.log(
        "Watches your source folder and bundles the app with source maps into the distribution folder on every change.\n"
    );
    console.log(chalk.cyan("npm run build"));
    console.log("Bundles the app without source maps into the distribution folder and creates the documentations.\n");
    console.log("We suggest that you begin by typing:\n");
    console.log(chalk.cyan("$ cd" + library.name));
    console.log(chalk.cyan("$ npm run dev\n"));
    console.log(chalk.green("Happy coding!"));
}

/**
 * @function logWelcomeMsg
 */
function logWelcomeMsg(library) {
    console.log("\n");
    console.log(chalk.cyan("######################################################\n"));
    console.log(chalk.cyan.bold("Welcome to the JavaScript library generator for APEX!\n"));
    console.log(chalk.cyan("######################################################\n"));
    console.log(chalk.bold(logSymbols.info, "Library name: ") + chalk.cyan(library.name) + "\n");
    console.log("Please answer the following additional questions:\n");
}
// log functions
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
    console.log(logSymbols.error, msg, err);
}
