const fs = require('fs');
function createDirectoryContents(templatePath, projectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;

        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            const writePath = `${projectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${projectPath}/${file}`);

            createDirectoryContents(`${templatePath}/${file}`, `${projectPath}/${file}`);
        }
    });
}

function writeLibrayDetails(library) {
    console.log(`setting package.json in "${library.getLibraryPath()}/package.json"`);
    const packageJsonPath = `${library.getLibraryPath()}/package.json`;
    let packageJSON = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJSON.name = library.name;
    packageJSON.version = library.version;
    packageJSON.libraryCode = library.code;
    fs.writeFileSync(`${library.getLibraryPath()}/package.json`, JSON.stringify(packageJSON, null, 4));
}

function mkdirSync(path) {
    fs.mkdirSync(path);
}
module.exports = {
    createDirectoryContents,
    writeLibrayDetails,
    mkdirSync
};
