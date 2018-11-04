const spawn = require("cross-spawn");

module.exports = {
    installDependencies
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

        command = "npm";
        args = ["install", "--loglevel", "error"];

        const child = spawn(command, args, { cwd: `${library.getLibraryPath()}`, stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(" ")}`
                });
                return;
            }
            resolve();
        });
    });
}
