const spawn = require('cross-spawn');

module.exports = {
    installDependencies,
    installPackage,
    updatePackage
};

/**
 * @function installDependencies
 * @description installs all dependencies from npm as specified in the templates package.json
 * @param {*} library - Library object
 */
function installDependencies(library) {
    return new Promise((resolve, reject) => {
        let command;
        let args;

        command = 'npm';
        args = ['install', '--loglevel', 'error'];

        const child = spawn(command, args, { cwd: `${library.getLibraryPath()}`, stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`
                });
                return;
            }
            resolve('done');
        });
    });
}

/**
 * @function installPackage
 * @description installs a package from npm
 * @param {string} packageName - name of npm package
 * @param {path} executionPath - directory in which the package should be installed
 */
function installPackage(packageName, executionPath) {
    return new Promise((resolve, reject) => {
        let command;
        let args;

        command = 'npm';
        args = ['install', packageName];

        const child = spawn(command, args, { cwd: `${executionPath}`, stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`
                });
                return;
            }
            resolve('done');
        });
    });
}

/**
 * @function uninstallPackage
 * @description uninstalls a package from npm
 * @param {string} packageName - name of npm package
 * @param {path} executionPath - directory in which the package should be installed
 */
function uninstallPackage(packageName, executionPath) {
    return new Promise((resolve, reject) => {
        let command;
        let args;

        command = 'npm';
        args = ['uninstall', packageName];

        const child = spawn(command, args, { cwd: `${executionPath}`, stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`
                });
                return;
            }
            resolve('done');
        });
    });
}

/**
 * @function updatePackage
 * @description updates a package from npm
 * @param {string} packageName - name of npm package
 * @param {path} executionPath - directory in which the package should be installed
 */
function updatePackage(packageName, executionPath) {
    return new Promise((resolve, reject) => {
        let command;
        let args;

        command = 'npm';
        args = ['update', packageName];

        const child = spawn(command, args, { cwd: `${executionPath}`, stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`
                });
                return;
            }
            resolve('done');
        });
    });
}
