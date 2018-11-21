# create-apex-js-app

[![npm](https://img.shields.io/npm/v/create-apex-js-app.svg?style=flat-square)](https://www.npmjs.com/package/create-apex-js-app) [![Build Status](https://travis-ci.org/dfrechdev/create-apex-js-app.svg?branch=master&style=flat-square)](https://travis-ci.org/dfrechdev/create-apex-js-app) [![David](https://img.shields.io/david/dfrechdev/create-apex-js-app.svg?style=flat-square)](https://github.com/dfrechdev/create-apex-js-app/blob/master/package.json) [![David](https://img.shields.io/david/dev/dfrechdev/create-apex-js-app.svg?style=flat-square)](https://github.com/dfrechdev/create-apex-js-app/blob/master/package.json) [![NpmLicense](https://img.shields.io/npm/l/create-apex-js-app.svg?style=flat-square)](https://github.com/dfrechdev/create-apex-js-app/blob/master/LICENSE)

`create-apex-js-app` bootstraps a JavaScript app for your Oracle APEX application based on a template. This template can either be a publicly available template as a npm package or git repository, or your own, fully customized template. By default, `create-apex-js-app` uses the [apexjs-template-js-lib][defaulttemplate] template, which allows you to create your own JavaScript library for APEX and includes a full build process.

By using a standardized way to build your JavaScript code, you will benefit from an increase in quality and reusability of your JavaScript codebase. `create-apex-js-app` helps you with the initial setup of your project, which can be tedious and time-consuming, and allows you to concentrate on your code.

## Before you start

Please make sure you have the following installed:

-   [node.js][node] >= 8.9.0

These tools are optional, but greatly enhance your development experience:

-   Visual Studio Code
-   Prettier Plugin for Visual Studio Code (a configuration file for Prettier is included)

## Create your app

To create your JavaScript app for APEX, run the following command in your shell with the app name replaced (the app name may only include letters, numbers, underscores and hashes):

```bash
npx create-apex-js-app <app-name>
```

This will download and run the generator package, without leaving anything installed on your machine from the generator itself. If you do not specify a template, as in this example, `create-apex-js-app` uses the [apexjs-template-js-lib][defaulttemplate] template.

You can also use a specific version for the generation of your app:

```bash
npx create-apex-js-app@0.0.1 <app-name>
```

This uses version 0.0.1 of this tool to create your app.

### Options

#### -n / --noinstall

By default, the required dependencies for your app are installed during the creation of your project. If you do not want this and rather install the dependencies yourself at a later point, you can use the --noinstall flag.

```bash
npx create-apex-js-app <app-name> --noinstall
```

Before you can start bundling your app, you then need to install the dependencies by running the following command from the route of your project:

```bash
npm install
```

#### -t / --template <templateName>

If you want to create your app with a different template, you can define the template at runtime by using the --template option:

```bash
npx create-apex-js-app <app-name> --template <templateName>
```

The template name can either be a npm package or a github repository. Below are examples of possible calls with the template option:

```bash
# load the template from the npm package apexjs-template-my-lib
npx create-apex-js-app myApp -t apexjs-template-my-lib

# load the template from the npm package apexjs-template-my-lib with the version 0.1.4
npx create-apex-js-app myApp -t apexjs-template-my-lib@0.1.4

# load the template from the github repository "myTemplate" of user "gituser" via https
npx create-apex-js-app myApp -t git+https://git@github.com/gituser/myTemplate.git

# load tag 0.1.4 of the template myLocalTemplate from your local git url with ssh
npx create-apex-js-app myApp -t git+ssh://git@my-local-git-url:myLocalTemplate.git#0.1.4
```

Please note, that while it is a possibility to install a project from a github repository like "gituser/repository", this notation can not be used here at this point. You must provide the full git url as shown above in order to assure that the template is loaded correctly.

Check below section for more details on how to [create your own template](#create-your-own-template) .

#### Available templates

The following templates are currently publicly available for `create-apex-js-app`:

| Template name                             | Description                                     |
| :---------------------------------------- | :---------------------------------------------- |
| [apexjs-template-js-lib][defaulttemplate] | Default template to create a JavaScript library |

You have an idea for an additional template? You already create a template and want to share it? Check out below section on [how to contribute][contributing].

#### -s / --supress-inquiry 

During the creation of your app, you might be asked additional question regarding the details of your app. These questions are set by the template you use. Check the documentation of the template you use for details regarding the setup questions.

This option is passed to the template and indicates, that no questions should be asked during the setup, hence the template must use default values for all questions. The main purpose for this is to allow the automatic build to pass without having to answer questions. You might however also use this option, if you are ok with all default values of a tempate anyways.

## How to write and build your app

How to write an build your app depends on the template you use. By default, this tool uses the [apexjs-template-js-lib][defaulttemplate] template. Check the documentation of the template for details regarding usage and the build process.

## Create your own template

When using this tool, chances are that at some point you want to change some of the predefined settings and generate your libraries from your own, customized template. To create your own template, please fork the default template repository ([apexjs-template-js-lib][defaulttemplate]) and create your template from that. Checkout the guide on [forking projects](https://guides.github.com/activities/forking/) if you are not familiar with forking. If you do not want to have your template publicly available, you can clone the template and then remove the link to the git repository as well.

Having created your copy of the default template, there are just a few things that you need to follow, in order to be able to use it from this tool:

1. The `package.json` file of your template project, needs to include all the dependencies required during the creation of a app with your template. It is important that they are added as dependencies and not devDependencies!
2. Your template must expose the function called `setupLibrary` and `logWelcomeMsg` in the `index.js` file in the root of your template. The `setupLibrary` function should include all customization you want to apply to your template during the creation of a new app and before the template files are copied. It can also include any questions you want to ask for details that you need for the app creation. Any action in that function must be wrapped in a promise, which is returned b the function. The `logWelcomeMsg` function can include any message you want to log to the console when the app has been created and should serve as a short introduction on how to use your template.
3. After the `setupLibrary` function has completed, a folder called `template` must exist in the root of your template. All files contained in that folder will be copied to the new app.
4. The template project should not contain the `node_modules` folder. Make sure, that this folder is added to the `.gitignore` file. All dependencies listed in your `package.json` will be installed during the creation of a new app.

## FAQ

-   **When creating the app with npx, the warning "Path must be a string. Received undefined." is shown.**

While not having an effect on the app creation, this is a know [issue](https://github.com/zkat/npx/issues/144) of npx and is solved by updating the npx package:

```bash
npm i -g npx
```

## Contribute

Found a bug? Have an idea? See [how to contribute][contributing].

## Author

Daniel Frech, 2018

## License

[MIT](LICENSE)

[contributing]: /CONTRIBUTING.md
[defaulttemplate]: https://github.com/dfrechdev/apexjs-template-js-lib
[node]: https://nodejs.org/en/download/
