# Conservatories in Ile de France - Angular 1.6

[![Build Status](https://travis-ci.org/eponae/angular-es-charts.svg?branch=master)](https://travis-ci.org/eponae/angular-es-charts)

[Find a conservatory in Ile de France](https://charts.eponae.fr)

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Gulp](http://gulpjs.com)

### Installation
1. Clone the repository: `git clone ...`
2. Install the NodeJS dependencies: `npm install`.
3. Start project: `npm start`
4. Run tests: `npm test`

### Development
Gulp tasks are defined in `gulpfile.js`. You can change those tasks to improve your development workflow.

#### External Modules

[`ui.bootstrap`](http://angular-ui.github.io/bootstrap/)
[`zingchart-angularjs`](https://www.zingchart.com/)
[`ui.router`](https://github.com/angular-ui/ui-router)
[`lodash`](https://lodash.com/)

## Project
### Modules, Routes
Modules and Routes are declared in `src/scripts/app.js`

### Ressources
Go to `src/assets` :
    - `sass` contains SASS stylesheets. If you want to override CSS for the project, write only into `sass/test.scss`. `css/test.css` will automatically be created and updated.
