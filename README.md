# Angular-ES-Charts - Angular 1.6 - ElasticSearch 5 - Charts

[![Build Status](https://travis-ci.org/eponae/angular-es-charts.svg?branch=master)](https://travis-ci.org/eponae/angular-es-charts)

[Find a conservatory in Paris](https://charts.eponae.fr)

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Gulp](http://gulpjs.com)

### Installation
1. Clone the repository: `git clone ...`
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on (http://localhost:8888).

### Development
Gulp tasks are defined in `gulpfile.js`. You can change those tasks to improve your development workflow.

#### External Modules

[`ui.bootstrap`](http://angular-ui.github.io/bootstrap/)
[`ui.router`](https://github.com/angular-ui/ui-router)
[`lodash`](https://lodash.com/)

## Project
### Modules
Modules are declared in `src/app/modules.js`

### Routes
The routes are declared in `src/app/routes.js`.

### Ressources
Go to `src/assets` :
    - `jsonfiles` contains JSON data,
    - `sass` contains SASS stylesheets. If you want to override CSS for the project, write only into `sass/test.scss`. `css/test.css` will automatically be created and updated.
