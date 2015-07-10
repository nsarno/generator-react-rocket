# generator-react-rocket [![Build Status](https://travis-ci.org/nsarno/generator-react-rocket.svg?branch=master)](https://travis-ci.org/nsarno/generator-react-rocket) [![npm version](https://badge.fury.io/js/generator-react-rocket.svg)](http://badge.fury.io/js/generator-react-rocket)

A [Yeoman](http://yeoman.io/) generator to bootstrap a React/Flux application powered by Gulp! 🚀

## Features

- Flux directory structure
- Build with [Gulp](http://gulpjs.com/)
  - Compile React (JSX) components (with [Babel](https://babeljs.io/))
  - Handle CommonJS dependencies with [Webpack](http://webpack.github.io/)
  - ES6 to ES5 (with [Babel](https://babeljs.io/))
  - Lint JS and JSX code with [JSHint](https://github.com/spalger/gulp-jshint)
  - Compile sass stylesheets
  - Browser sync
  - Uglify javascript with [UglifyJS](https://github.com/terinjokes/gulp-uglify)
  - Minify css with [gulp-minify-css](https://github.com/murphydanger/gulp-minify-css)
  - Build for Production with `--production`
  - Preprocess javascript with [gulp-preprocess](https://github.com/jas/gulp-preprocess)
- Components testing with Karma
- Component sub-generator

## Getting Started

### Install

```bash
npm install -g yo
npm install -g generator-react-rocket
```

### Usage

```bash
mkdir myapp && cd myapp
yo react-rocket
```

### Run your tests (with Karma)

```bash
npm test
```

### Gulp tasks

- `gulp` or `gulp serve` to start a developement web server with live reload (supports the `--production` flag)
- `gulp build` to build the app in dist/ directory (supports the `--production` flag)
- `gulp clean` to clean up dist/ directory

### react-rocket:component

Generates a JSX component class in `src/scripts/components` and the associated test file in `src/scripts/components/__tests__`

```bash
yo react-rocket:component
```

## Future improvements

- More sub-generators for commonly created files
- Remove npm dependencies and use bower components instead
- Create a gulp task to run tests

## See also

[Rocket](https://github.com/nsarno/rocket), a Rails API application template.

## License

MIT
