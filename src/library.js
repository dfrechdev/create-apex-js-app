const commander = require('commander');
const logger = require('./logger');
const filesHandler = require('./filesHandler');
const npmHandler = require('./npmHandler');
const pkgJson = require('../package.json');
const path = require('path');

class Library {
    constructor(execPath, currPath) {
        this.execPath = execPath;
        this.currPath = currPath;
        this.installDependencies;
        this.templatePackage;
        this.name;
        this.code;
        this.version;
        this.program = this.setProgram();
    }

    getLibraryPath() {
        return path.join(this.currPath, this.name);
    }

    getTemplatePath() {
        const templateName = this.templatePackage.substr(this.templatePackage.indexOf('/') + 1);
        return path.join(this.execPath, 'node_modules', templateName, 'template');
    }

    setProgram() {
        return new commander.Command(pkgJson.name)
            .version(pkgJson.version)
            .arguments('<project-directory>')
            .usage('<project-directory> [options]')
            .action((name) => {
                this.name = name;
            })
            .option('-t, --template', 'template package')
            .option('-n, --noinstall', 'do not install dependencies')
            .parse(process.argv);
    }

    parseProgram() {
        this.program.parse(process.argv);

        this.templatePackage = this.program.templatePackage
            ? this.program.templatePackage
            : 'apexjs-template-js-lib';

        this.installDependencies = this.program.noinstall ? false : true;

        if (typeof this.name === 'undefined') {
            logger.logError('Error: Please specify a name for the library you want to create!');
            logger.logInfo('See create-apex-js-lib --help for more information.');
            process.exit(1);
        }
    }

    create() {
        logger.logWelcomeMsg(this);

        this.installTemplate()
            .then(() => {
                this.createLibraryDirectorySync();
                this.copyTemplateFilesSync();
                const template = require(this.templatePackage);
                return template.setupLibrary(this, logger);
            })
            .then(() => {
                return this.runInstall();
            })
            .then(() => logger.logLibraryCreatedMsg(this));
    }

    installTemplate() {
        logger.logInfo(`installing template ${this.templatePackage}`);
        try {
            return npmHandler
                .installPackage(this.templatePackage, this.execPath)
                .then(() => logger.logSuccess('done\n'));
        } catch (e) {
            logger.logError('Error during the installation of the template package: ', e);
            process.exit(1);
        }
    }

    runInstall() {
        if (this.installDependencies) {
            try {
                logger.logInfo('installing dependencies');
                return npmHandler.installDependencies(this).then(() => logger.logSuccess('done'));
            } catch (e) {
                logger.logError('An error occuered during the installation of the dependencies: ', e);
                process.exit(1);
            }
        } else {
            logger.logWarning(
                'Your dependencies have not been installed. Please run "npm install" inside of your project.\n'
            );
            return Promise.resolve('done');
        }
    }

    createLibraryDirectorySync() {
        try {
            logger.logInfo('creating directory');
            filesHandler.mkdirSync(this.getLibraryPath());
            logger.logSuccess('done\n');
        } catch (e) {
            logger.logError('Error during directory creation: ', e);
            process.exit(1);
        }
    }

    copyTemplateFilesSync() {
        try {
            logger.logInfo('copying template files');
            filesHandler.createDirectoryContents(this.getTemplatePath(), this.getLibraryPath());
            logger.logSuccess('done\n');
        } catch (e) {
            logger.logError('Error while copying the template files: ', e);
            process.exit(1);
        }
    }
}
module.exports = Library;
