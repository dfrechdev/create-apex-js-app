const commander = require('commander');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');
const logUtil = require('./logUtil');
const fileUtil = require('./fileUtil');
const npmUtil = require('./npmUtil');
const pkgJson = require('../package.json');

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
        return `${this.currPath}/${this.name}`;
    }

    getTemplatePath() {
        return `${this.execPath}/templates/${this.templateName}`;
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
            logUtil.logError('Error: Please specify a name for the library you want to create!');
            logUtil.logInfo('See create-apex-js-lib --help for more information.');
            process.exit(1);
        }
    }

    create() {
        logUtil.logWelcomeMsg(this);

        inquirer.prompt(this.questions).then((answers) => {
            logUtil.log('\ngreat, setting up your project now ...\n');

            this.code = answers['library-code'];
            this.version = answers['initial-version'];

            try {
                logUtil.logInfo('creating directory');
                fileUtil.mkdirSync(this.getLibraryPath());
                logUtil.logSuccess('done\n');
            } catch (e) {
                logUtil.logError('Error during directory creation: ', e);
                process.exit(1);
            }

            try {
                logUtil.logInfo('copying project template');
                fileUtil.createDirectoryContents(this.getTemplatePath(), this.getLibraryPath());
                logUtil.logSuccess('done\n');
            } catch (e) {
                logUtil.logError('Error while copying the template: ', e);
                process.exit(1);
            }

            try {
                logUtil.logInfo('setting project details');
                fileUtil.writeProjectDetails(this);
                logUtil.logSuccess('done\n');
            } catch (e) {
                logUtil.logError('Unable to set project details: ', e);
                process.exit(1);
            }

            if (this.installDependencies) {
                try {
                    logUtil.logInfo('installing dependencies');
                    npmUtil.installDependencies(this).then(() => {
                        logUtil.logSuccess('done');
                        logUtil.logLibraryCreatedMsg(this);
                    });
                } catch (e) {
                    logUtil.logError('Unable to set project details: ', e);
                    process.exit(1);
                }
            } else {
                logUtil.logWarning(
                    'Your dependencies have not been installed. Please run "npm install" inside of your project.\n'
                );
                logUtil.logLibraryCreatedMsg(this);
            }
        });
    }
}
module.exports = Library;
