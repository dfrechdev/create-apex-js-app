const commander = require('commander');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');
const logger = require('./logger');
const filesHandler = require('./filesHandler');
const npmHandler = require('./npmHandler');
const pkgJson = require('../package.json');
const path = require('path');

class Library {
    constructor(execPath, currPath, templateName) {
        this.execPath = execPath;
        this.currPath = currPath;
        this.templateName = templateName;
        this.installDependencies = true;
        this.name;
        this.code;
        this.version;
        this.program = this.setProgram();
        this.questions = this.setQuestions();
    }

    getLibraryPath() {
        return path.join(this.currPath, this.name);
    }

    getTemplatePath() {
        return path.join(this.execPath, 'templates', this.templateName);
    }

    setQuestions() {
        return [
            {
                name: 'library-code',
                type: 'input',
                default: this.name,
                message: 'Library code:',
                validate: function(input) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'The library code may only include letters, numbers, underscores and hashes.';
                }
            },
            {
                name: 'initial-version',
                type: 'input',
                message: 'Initial version:',
                default: '1.0.0',
                validate: function(input) {
                    if (semverRegex().test(input)) return true;
                    else return 'The initial version must match a semantic versions such as 0.0.1';
                }
            }
        ];
    }

    setProgram() {
        return new commander.Command(pkgJson.name)
            .version(pkgJson.version)
            .arguments('<project-directory>')
            .usage('<project-directory> [options]')
            .action((name) => {
                this.name = name;
            })
            .option('-n, --noinstall', 'do not install dependencies')
            .parse(process.argv);
    }

    parseProgram() {
        this.program.parse(process.argv);
        if (this.program.noinstall) {
            this.installDependencies = false;
        }

        if (typeof this.name === 'undefined') {
            logger.logError('Error: Please specify a name for the library you want to create!');
            logger.logInfo('See create-apex-js-lib --help for more information.');
            process.exit(1);
        }
    }

    create() {
        logger.logWelcomeMsg(this);

        inquirer.prompt(this.questions).then((answers) => {
            logger.log('\nsetting up your library now ...\n');

            this.code = answers['library-code'];
            this.version = answers['initial-version'];

            try {
                logger.logInfo('creating directory');
                filesHandler.mkdirSync(this.getLibraryPath());
                logger.logSuccess('done\n');
            } catch (e) {
                logger.logError('Error during directory creation: ', e);
                process.exit(1);
            }

            try {
                logger.logInfo('copying template files');
                filesHandler.createDirectoryContents(this.getTemplatePath(), this.getLibraryPath());
                logger.logSuccess('done\n');
            } catch (e) {
                logger.logError('Error while copying the template files: ', e);
                process.exit(1);
            }

            try {
                logger.logInfo('setting library details');
                filesHandler.writeLibarayDetails(this);
                logger.logSuccess('done\n');
            } catch (e) {
                logger.logError('Unable to set library details: ', e);
                process.exit(1);
            }

            if (this.installDependencies) {
                try {
                    logger.logInfo('installing dependencies');
                    npmHandler.installDependencies(this).then(() => {
                        logger.logSuccess('done');
                        logger.logLibraryCreatedMsg(this);
                    });
                } catch (e) {
                    logger.logError('An error occuered during the installation of the dependencies: ', e);
                    process.exit(1);
                }
            } else {
                logger.logWarning(
                    'Your dependencies have not been installed. Please run "npm install" inside of your project.\n'
                );
                logger.logLibraryCreatedMsg(this);
            }
        });
    }
}
module.exports = Library;
