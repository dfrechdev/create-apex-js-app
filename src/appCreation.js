const logger = require('./logger');
const fsUtil = require('./fsUtil');
const npmHandler = require('./npmHandler');

/**
 * @exports appCreation
 * @description File that includes all the necessary steps during the creation of a new app
 */
module.exports = {
    installTemplate,
    installDependencies,
    createAppDirectorySync,
    copyTemplateFilesSync,
    setupTemplate
};

function installTemplate(app) {
    logger.logInfo(`installing template "${app.templateUrl}"`);
    return npmHandler.installPackage(app.templateUrl, app.execPath).then(() => logger.logSuccess('done\n'));
}

function installDependencies(app) {
    if (app.program.noInstall) {
        logger.logWarning(
            'Your dependencies have not been installed. Please run "npm install" inside of your project.\n'
        );
        return Promise.resolve('done');
    }
    logger.logInfo('installing dependencies');
    return npmHandler.installDependencies(app.getAppPath()).then(() => logger.logSuccess('done\n'));
}

function createAppDirectorySync(app) {
    try {
        logger.logInfo('creating app directory');
        fsUtil.createDirectorySync(app.getAppPath());
        logger.logSuccess('done\n');
    } catch (e) {
        logger.logError('Error during directory creation: ', e);
        process.exit(1);
    }
}

function copyTemplateFilesSync(app) {
    try {
        logger.logInfo('copying template files');
        fsUtil.copyFiles(app.getTemplatePath(), app.getAppPath());
        logger.logSuccess('done\n');
    } catch (e) {
        logger.logError('Error while copying the template files: ', e);
        process.exit(1);
    }
}

function setupTemplate(app, template) {
    logger.logInfo('setting up template');
    return template.setupApp(app.getBasicAppInfo()).then(() => logger.logSuccess('done\n'));
}
