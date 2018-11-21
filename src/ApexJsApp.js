const commander = require('commander');
const logger = require('./logger');
const pkgJson = require('../package.json');
const path = require('path');
const GitUrlParse = require('git-url-parse');
const appCreation = require('./appCreation');
const chalk = require('chalk');

/**
 * @class ApexJsApp
 * @description Main class for setting up a JavaScript apf for APEX
 */
class ApexJsApp {
    constructor(execPath, currPath) {
        this.execPath = execPath;
        this.currPath = currPath;
        this.templateUrl;
        this.templateName;
        this.isGitHosted = false;
        this.name;
        this.program;
    }

    getAppPath() {
        return path.join(this.currPath, this.name);
    }

    getTemplatePath() {
        return path.join(this.execPath, 'node_modules', this.templateName, 'template');
    }

    getBasicAppInfo() {
        return { 
            appName: this.name, 
            appPath: this.getAppPath(),
            supressInquiry: this.program.supressInquiry
        };
    }

    setProgram() {
        // set and parse command line options
        this.program = new commander.Command(pkgJson.name)
            .version(pkgJson.version)
            .arguments('<project-directory>')
            .usage('<project-directory> [options]')
            .action((name) => {
                this.name = name;
            })
            .option('-t, --template [value]', 'template name')
            .option('-n, --no-install', 'do not install dependencies')
            .option('-s, --supress-inquiry', 'supress inquiry during app creation')
            .parse(process.argv);

        // set template url if template option is given
        // otherwise use the default template
        this.templateUrl = this.program.template ? this.program.template : 'apexjs-template-js-lib';

        // verify that the name of the app has been defined
        if (typeof this.name === 'undefined') {
            logger.logError('Error: Please specify a name for the app you want to create!');
            logger.logInfo('See create-apex-js-lib --help for more information.');
            process.exit(1);
        }

        // check if template Url points to a npm package of a git repository
        if (this.templateUrl.match(/^git+.*/)) {
            this.isGitHosted = true;
            this.templateName = GitUrlParse(this.templateUrl).name;
        } else {
            this.templateName = this.templateUrl;
        }
    }

    create() {
        logger.log('\n' + chalk.cyan.bold('Create your JavaScript app for APEX!\n'));
        logger.log(chalk.bold('app name: ') + chalk.cyan(this.name) + '\n');

        let template; 
        
        appCreation
            // install template, if a template has been defined in options
            .installTemplate(this)            
            .then(() => {
                // setup app directory, copy template files and forward to template for setup
                appCreation.createAppDirectorySync(this);
                appCreation.copyTemplateFilesSync(this);
                // load installed template
                template = require(this.templateName);            
                return appCreation.setupTemplate(this, template);
            })
            .catch((e) => {
                logger.logError('error during the setup of the template', e);
                process.exit(1);
            })
            // install all dependencies for the app
            .then(() => {
                return appCreation.installDependencies(this);
            })
            .catch((e) => {
                logger.logError('error during the installation of the apps dependencies', e);
                process.exit(1);
            })
            // wrap up app creation
            .then(() => {
                logger.logSuccess(`created app "${this.name}" at "${this.getAppPath()}".\n`);
                template.logWelcomeMsg(this.getBasicAppInfo());
                logger.log(chalk.green('\nHappy coding!'));
            });
    }
}
module.exports = ApexJsApp;
