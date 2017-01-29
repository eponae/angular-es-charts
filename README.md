# Angular-ES-Charts - Angular 1.5 - ElasticSearch 2.3 - Charts

[![Build Status](https://travis-ci.org/lili1725/angular-es-charts.svg?branch=master)](https://travis-ci.org/lili1725/angular-es-charts)

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
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

[`sb-admin-2`](http://startbootstrap.com/template-overviews/sb-admin-2/)
[`ui.bootstrap`](http://angular-ui.github.io/bootstrap/)
[`ui.router`](https://github.com/angular-ui/ui-router)
[`highcharts-ng`](https://github.com/pablojim/highcharts-ng)
[`highcharts`] (https://github.com/highslide-software/highstock-release)
[`lodash`](https://lodash.com/)

If you'd like to include any additional modules/packages not included, add them to your `bower.json` file and then update the `src/index.html` file, to include them in the minified distribution output. You must perform `bower install`.

## Project
### Modules
Modules are declared in `src/app/modules.js`

### Routes
The routes are declared in `src/app/routes.js`.

### Ressources
Go to `src/assets` :
    - `jsonfiles` contains JSON data,
    - `sass` contains SASS stylesheets. If you want to override CSS for the project, write only into `sass/test.scss`. `css/test.css` will automatically be created and updated.
