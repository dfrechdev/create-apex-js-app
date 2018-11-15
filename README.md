# create-apex-js-lib

**This project is currently in development and will be made available for creating your libraries as described below soon.  Contact me, if you want to receive an update as soon as the project is relaesed.**

[![Build Status](https://travis-ci.org/dfrechdev/create-apex-js-lib.svg?branch=master)](https://travis-ci.org/dfrechdev/create-apex-js-lib)

## Introduction

create-apex-js-lib bootstraps a JavaScript project for APEX, that bundles all your source code into a library. During the process of bundling the library, your source code is transformed in the following ways:

-   All JavaScript code is bundled into one file
-   All JavaScript code is transpiled to ES5 syntax
-   Language features that are not part of ES5 and cannot be transpiled (eg. Promise, Map, Set, ...) are automatically polyfilled if you use them in your code
-   In development mode, source maps are created inline within the bundle file to ease debugging in the browsers development console
-   ESLint statically checks the source code with the "eslint:recommended" ruleset
-   CSS files that are imported into the JavaScript source files are extracted with vendor prefixes added into a seperate CSS file
-   All code is minified and shortened

The result of the build process is a JavaScript bundle file, that contains your transpiled source code with the dependencies and all the required polyfills, as well as a CSS file that included the CSS code of all imported CSS files. The bundled file can be used in APEX and exposes your code in one library variable to your application.

All default settings can be changed according to your need after you have created the library.

## Before you start

To create your JavaScript library for APEX please make sure you have the follwing installed:

-   node.js >= 8.9.0
-   npm >= 5.2.0

The following tools are optional but greatly enhance your development experience:

-   Visual Studio Code
-   Prettier Plugin for Visual Studio Code (a configuration file for Prettier is included)

## Create your library

To create your JavaScript library for APEX, run the following command in your shell with your library name replaced (the library name may only include letters, numbers, underscores and hashes):

```bash
npx create-apex-js-lib <library-name>
```

This will download and run the project generator in one step, without leaving anything installed on your machine from the generator application itself.

You can also use a specific version for the generation of your library if you wish:

```bash
npx create-apex-js-lib@1.0.1 <library-name>
```

This uses version 1.0.1 of the project to create your library.

Alternatively, you can also install the package globally and run it seperately:

```bash
npm i -g create-apex-library
create-apex-library <library-name>
```

Please note, that if you are using this way, you need to manually update the create-apex-js-lib project, in order to create your library with the newest version.

### Options

#### --noinstall

By default, the required dependencies for your library are installed during the creation of your project. If you do not want this and rather install the dependencies yourself at a later point, you can use the --noinstall flag.

```bash
npx create-apex-js-lib <library-name> --noinstall
```
Before you can start bundling your library, you then need to install the dependencies later by running the follwing command from the route of your project:
```bash
npm install
```

#### --template <templateName>

If you want to create your project with a different template, you can define the template at runtime by using the --template option:

```bash
npx create-apex-js-lib <library-name> --template <templateName>
```
The template name can either be a npm package or a github repository. Below are all examples of possible calls with the template option:

```bash
# load the template from the npm package apexjs-template-my-lib 
npx create-apex-js-lib myLib --template apexjs-template-my-lib 

# load the template from the npm package apexjs-template-my-lib with the version 0.1.4
npx create-apex-js-lib myLib --template apexjs-template-my-lib@0.1.4 

# load the template from the github project apexjs-template-my-lib of user githubUser
npx create-apex-js-lib myLib --template githubUser/apexjs-template-my-lib

# load tag 0.1.4 of the template apexjs-template-my-lib from your local git server with ssh
npx create-apex-js-lib myLib --template git+ssh://git@mygitserver.com:apexjs-template-my-lib.git#0.1.4 
```
Check you below section on how to [create your own template](#create-your-own-template) for further details.

### Questions during creation of library

During the creation of your library, you will be asked a few additional questions:

-   **Library code**: This will be the code that is exposed on your APEX page and contains all of your source code. As with the library name, the library code may only include letters, numbers, underscores and hashes. By default, your library name is used for the library code as well.

-   **Initial version**: Define the initial version of your library. The version needs to follow the [semantic versioning](https://semver.org/) rules. By default, version 1.0.0 is used.

## How to use your library

The project contains a "src" folder with a file called "main.js". This is the default entry point for the bundle generation and the place where your JavaScript code should go. You can import any node package that you have installed or local modules that you have created in seperate files. All exported variables, objects or functions within the main.js file will be accessible in your library. Check the "examples" folder in your project to see how you can add your code.

### Development build

To create a bundle for development, issue the following command from the root of the project:

```bash
npm run dev
```

This will create the bundled JavaScript and CSS files with your transformed source code in the "dist" folder. Further it will watch the source folder for changes and will rebundle the file whenever a change occurs.

### Create documentation

To create the JSDoc documentation from your source code, run the follwing command:

```bash
npm run doc
```

This will create the documentation in the "dist/doc" folder of your project.

### Prodution build

To bundle everything for production, issue the following command:

```bash
npm run build
```

This will create JSDoc documentation and the bundled JavaScript and CSS files, but without source maps. With the "build" command, only the build is run and no watcher for further changes is started.

## Configuring your library

You can change your build to your needs by changing the following configuration files:

-   [package.json](https://docs.npmjs.com/files/package.json): Root configuration file of your project. Includes the name of your library, the exposed library code, the version of your library and many more.
-   [rollup.config.js](https://rollupjs.org/guide/en): Configuration file for the bundle process of your library
-   [.eslintrc.json](https://eslint.org/docs/user-guide/configuring): Settings file for ESLint. By default the predefined [eslint:recommended](https://eslint.org/docs/rules/) rules are used for ESlint. If you want to use another set, you can change it in this configuration file. The .eslintignore file in addition includes all the files that should be ignored by ESLint
-   [.prettierrc](https://github.com/prettier/prettier): Rules for the Prettier extension in VSCode
-   [jsdoc.conf](http://usejsdoc.org/about-configuring-jsdoc.html): Configuration file for documentation creation with JSDoc

### Externals

Externals are parts of your library, that will not be included in your bundle, as they are already loaded on your page. By default, the apex and jQuery libraries are excluded from the bundle process.

#### apex

The apex JavaScript API is passed to your library as an argument when it is loaded. You therefore need to ensure, that your library is loaded after the apex library.

#### jQuery

The jQuery library is included in the apex JavaScript API and can be referenced with "apex.jQuery". Additionally, you can map "apex.jQuery" to the "$" variable in your files if you wish such as:

```javascript
const $ = apex.jQuery;
```

As you are working in your own namespace, it is safe to override the $ variable. This way you ensure that you always access the jQuery library from the apex JavaScript API while beeing able to continue to use the "$" shortcut.

#### Other

For other external libraries that are already available on your site and you do not want to add to your library as a dependency, you can extend the configuration. In the rollup.config.js file you will find a "globals" and "external" attribute that you can amend to your needs.

## Create your own template

When using this tool, chances are that at some point you want to change some of the predefined settings and generate your libraries from your own, customized template. By default, the template [apexjs-template-js-lib](https://github.com/dfrechdev/apexjs-template-js-lib) is used for generating the libary. To create your own template, the best way to do this is to fork the default template repository and create your template from that. Chechkout the guide on [Forking Projects](https://guides.github.com/activities/forking/) if you are not familiar with forking. If you do not want to have your template publicly available, you can just clone the template and then remove the link to the git repository as well.

Having created your copy of the default template, there are only a few things that you need to follow, in order to be able to use it from this tool:

1. The `package.json` file of your template project, needs to include all the dependencies required during the creation of a new library with your template. Please note, that they need to be added as dependencies and not devDependencies!
2. Your template needs to expose a method called `setupLibrary()` in the `index.js` file in the root of your template. This method will be called during the generation of the library and should include all customization that want to apply to your template during the creation of a new library.
3. Once the above method has completed, there needs to be a folder called `template` in the root of your template. All files contained in that folder will be copied to the new library during the creation.
4. The template project should not contain the `node_modules` folder. Make sure, that this folder is added to the `.gitignore` file. All dependencies listed in your `package.json` will be installed during the creation of a new library.

That's all you need to do, to start creating libraries with your own template!

## Author

Daniel Frech, 2018

## License

[MIT](LICENSE)
