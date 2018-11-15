# create-apex-js-app

**This project is currently in development and will be made available for creating your libraries as described below soon. Contact me, if you want to receive an update as soon as the project is released.**

## Introduction

This tool bootstraps a JavaScript app for your APEX application. By default, it uses the [apexjs-template-js-lib](https://github.com/dfrechdev/apexjs-template-js-lib) template, which allows you to create your own JavaScript library for APEX and includes a full build process the transforms your source code in the following ways:

-   all JavaScript code is bundled into one file
-   all JavaScript code is transpiled to ES5 syntax
-   in development mode, source maps are created inline within the bundle file to ease debugging in the browsers development console
-   ESLint statically checks the source code with the `eslint:recommended` rule set
-   CSS files that are imported into the JavaScript source files are extracted with vendor prefixes added into a separate CSS file
-   all transformed code is minimized and shortened
-   language features that are not part of ES5 and cannot be transpiled (eg. Promise, Map, Set, ...) and are use in the code are polyfilled

The result of the build process is a JavaScript bundle file, that contains the transpiled source code with the dependencies and required polyfills, as well as a CSS file that includes the code of all imported CSS files. The bundled file can be used in APEX and exposes the source code in one library variable to the application.

All default settings can be changed according to your needs after you have created the app.

## Benefits of using create-apex-js-app

By using a standardized way to build your JavaScript code for APEX, you will boost the quality and reusability of your Javascript code. Check out my blog post at []() for a detailed look and full list of advantages.

## Before you start

Before you start, make sure you have the following installed:

-   node.js >= 8.9.0
-   npm >= 5.2.0

These tools are optional, but greatly enhance your development experience:

-   Visual Studio Code
-   Prettier Plugin for Visual Studio Code (a configuration file for Prettier is included)

## Create your app

To create your JavaScript app for APEX, run the following command in your shell with the app name replaced (the app name may only include letters, numbers, underscores and hashes):

```bash
npx create-apex-js-app <app-name>
```

This will download and run the generator package, without leaving anything installed on your machine from the generator itself.

You can also use a specific version for the generation of your app:

```bash
npx create-apex-js-app@0.0.1 <app-name>
```

This uses version 0.0.1 of this tool to create your app.

Alternatively, you can also install the package globally and run it separately:

```bash
npm i -g create-apex-js-app
create-apex-js-app <app-name>
```

Please note, that if you install the package globally, you need to manually update it in the future. Also, any subsequent run, even with npx, will use the globally installed package, rather than downloading it again.

### Options

#### --noinstall

By default, the required dependencies for your app are installed during the creation of your project. If you do not want this and rather install the dependencies yourself at a later point, you can use the --noinstall flag.

```bash
npx create-apex-js-app <app-name> --noinstall
```

Before you can start bundling your app, you then need to install the dependencies by running the following command from the route of your project:

```bash
npm install
```

#### --template <templateName>

If you want to create your app with a different template, you can define the template at runtime by using the --template option:

```bash
npx create-apex-js-app <app-name> --template <templateName>
```

The template name can either be a npm package or a github repository. Below are all examples of possible calls with the template option:

```bash
# load the template from the npm package apexjs-template-my-lib
npx create-apex-js-app myApp --template apexjs-template-my-lib

# load the template from the npm package apexjs-template-my-lib with the version 0.1.4
npx create-apex-js-app myApp --template apexjs-template-my-lib@0.1.4

# load the template from the github project apexjs-template-my-lib of user githubUser
npx create-apex-js-app myApp --template githubUser/apexjs-template-my-lib

# load tag 0.1.4 of the template apexjs-template-my-lib from your local git server with ssh
npx create-apex-js-app myApp --template git+ssh://git@mygitserver.com:apexjs-template-my-lib.git#0.1.4
```

Check you below section on how to [create your own template](#create-your-own-template) for further details.

### Questions during the creation

During the creation of your library, you might be asked additional question regarding the details of your app. The questions are however not predefined and rather defined from the template you use. By default, this tool uses the [apexjs-template-js-lib](https://github.com/dfrechdev/apexjs-template-js-lib) template. Check the documentation of the template for details regarding the setup questions.

## How to use your app

The generated app contains a `src` folder with a file called `main.js`. This is the default entry point for the bundle generation and the place where your JavaScript code should go. You can import any node package that you have installed or local modules that you have created in separate files. All exported variables, objects or functions within the main.js file will be accessible in your library. Check the `examples` folder in your app to see how you can add your code.

### Development build

To create a bundle for development, issue the following command from the root of your app:

```bash
npm run dev
```

This will create the bundled JavaScript and CSS files with your transformed source code in the `dist` folder. Further it will watch the source folder for changes and will bundle the file whenever a change occurs.

### Create documentation

To create the JSDoc documentation from your source code, run the following command:

```bash
npm run doc
```

This will create the documentation in the `dist/doc` folder of your app.

### Production build

To bundle everything for production, issue the following command:

```bash
npm run build
```

This will create JSDoc documentation and the bundled JavaScript and CSS files, but without source maps. With the `build` command, only the build is run and no watcher for further changes is started.

## Configuring your library

You can change your build to your needs by changing the following configuration files:

-   [package.json](https://docs.npmjs.com/files/package.json): Root configuration file of your project. Includes the name of your app, the exposed library code, the version of your app and many more.
-   [rollup.config.js](https://rollupjs.org/guide/en): Configuration file for the bundle process of your library
-   [.eslintrc.json](https://eslint.org/docs/user-guide/configuring): Settings file for ESLint. By default the predefined [eslint:recommended](https://eslint.org/docs/rules/) rules are used for ESlint. If you want to use another set, you can change it in this configuration file. The .eslintignore file in addition includes all the files that should be ignored by ESLint
-   [.prettierrc](https://github.com/prettier/prettier): Rules for the Prettier extension in VSCode
-   [jsdoc.conf](http://usejsdoc.org/about-configuring-jsdoc.html): Configuration file for documentation creation with JSDoc

### Externals

Externals are parts of your app, that should not be included in your bundle, as they are already loaded on your page, such as jQuery for example. The template you uses decides which parts should be added as externals. By default, this tool uses the [apexjs-template-js-lib](https://github.com/dfrechdev/apexjs-template-js-lib) template. Check the documentation of the template for details regarding externals.

Additional external libraries that are already available on your site and should not be bundled can be added to the rollup.config.js file.

## Create your own template

When using this tool, chances are that at some point you want to change some of the predefined settings and generate your libraries from your own, customized template. To create your own template, please fork the default template repository ([apexjs-template-js-lib](https://github.com/dfrechdev/apexjs-template-js-lib)) and create your template from that. Checkout the guide on [forking projects](https://guides.github.com/activities/forking/) if you are not familiar with forking. If you do not want to have your template publicly available, you can clone the template and then remove the link to the git repository as well.

Having created your copy of the default template, there are just a few things that you need to follow, in order to be able to use it from this tool:

1. The `package.json` file of your template project, needs to include all the dependencies required during the creation of a app with your template. It is important that they are added as dependencies and not devDependencies!
2. Your template needs to expose a method called `setupLibrary()` in the `index.js` file in the root of your template. This method should include all customization you want to apply to your template during the creation of a new app.
3. When the above method has completed, there needs to exist a folder called `template` in the root of your template. All files contained in that folder will be copied to the new app during the creation.
4. The template project should not contain the `node_modules` folder. Make sure, that this folder is added to the `.gitignore` file. All dependencies listed in your `package.json` will be installed during the creation of a new app.

## Author

Daniel Frech, 2018

## License

[MIT](LICENSE)
