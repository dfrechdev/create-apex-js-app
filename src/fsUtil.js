const fs = require('fs');
function copyFiles(templatePath, appPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;

        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            const writePath = `${appPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${appPath}/${file}`);

            copyFiles(`${templatePath}/${file}`, `${appPath}/${file}`);
        }
    });
}

function createDirectorySync(appPath) {
    fs.mkdirSync(appPath);
}
module.exports = {
    copyFiles,
    createDirectorySync
};
