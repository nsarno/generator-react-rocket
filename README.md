# generator-react-rocket [![Build Status](https://secure.travis-ci.org/nsarno/generator-react-rocket.png?branch=master)](https://travis-ci.org/nsarno/generator-react-rocket)

A [Yeoman](http://yeoman.io/) generator to bootstrap a React/Flux application powered by Gulp! 🚀

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

### Gulp tasks

`gulp` or `gulp serve` to start a developement web server with live reload
`gulp build` to build the app in dist/ directory
`gulp clean` to clean up dist/ directory

## Features

- Build with Gulp
- Compile sass stylesheets
- Compile React (JSX) components (with babel)
- ES6 to ES5 (with babel)
- Handle CommonJS dependencies with Webpack
- Browser sync

## Future improvements

- Different environments (development, staging, production)
- Prepare assets for production (uglify, minify, etc...)
- Add a gulp task to run tests
- Lint JS code
- Prevent browser cache problems with gulp-rev

## See also

[Rocket](https://github.com/nsarno/rocket), a Rails API application template.

## License

MIT
