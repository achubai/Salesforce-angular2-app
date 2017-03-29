# Mcm

[You should know](https://gitlab.ims.io/Dev/Documents/wikis/home)

## Development process
This project use [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0 to build and run in browser.
To be able to run project you should install it's dependencies via npm `npm i`

Run `npm start` for a dev server. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive/pipe/service/class/module`.

#### Build

Run `npm build:dev` to build the project. The build artifacts will be stored in the `dist/` directory and
 `.tmp/` directory will contain pages and static resources for salesforce.
 The same behavior for `npm build:prod` but the build:prod use `--prod` and `--aot` flags

#### Running unit tests

Run `npm run test:dev` or `npm run test:prod` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


#### Dev deploy

Before development deployment you should fill sandbox credentials in `gulp/config.js`
```
...
deploy: {
    username:       'User',
    password:       'Password'
...
```
after that you are able to run `npm run deploy:dev`.

## Folders structure

```
<root folder>/
├── e2e/
├── gulp/                                           
| └── config.js                                     ← config for salesforce building and deployment
├── src/
| ├── app/                                          ← development directory, each module would be in other bundle after build 
| | ├── common/ 
| | | ├── components/ 
| | | | ├── component/
| | | | | └── component.ts|html|css|spec.ts 
| | | ├── constants/ 
| | | | └── ... 
| | | ├── directives/ 
| | | | └── ... 
| | | ├── filters/ 
| | | | └── ... 
| | | ├── repositories/ 
| | | | └── ... 
| | | ├── services/ 
| | | | └── ... 
| | | ├── static/ 
| | | ├── common.component.ts|html|css|spec.ts 
| | | ├── common.module.ts 
| | | └── common-routing.module.ts 
| | ├── auth/ 
| | | ├── components/ 
| | | | ├── component/
| | | | | └── component.ts|html|css|spec.ts 
| | | ├── constants/ 
| | | | └── ... 
| | | ├── directives/ 
| | | | └── ... 
| | | ├── filters/ 
| | | | └── ... 
| | | ├── repositories/ 
| | | | └── ... 
| | | ├── services/ 
| | | | └── ... 
| | | ├── static/ 
| | | ├── auth.component.ts|html|css|spec.ts 
| | | ├── auth.module.ts 
| | | └── auth-routing.module.ts 
| | ├── app.component.ts|html|css|spec.ts                ← root component 
| | ├── app.module.ts ← root module
| | └── app-routing.module.ts 
| ├── main.ts
| ├── index.html                                       ← root index file
| └──  index.page.html                                 ← visualforse page
├── dist/                                              ← compresed, fully optimized and deployment ready applications
├── .tmp/                                              ← salasforce pages and static resources
├── mockups/                                           ← sf.com mockups for development and for unittests
├── node_modules                                       ← node modules folder
| └── ...
└── package.json                                       ← npm configuration file
```