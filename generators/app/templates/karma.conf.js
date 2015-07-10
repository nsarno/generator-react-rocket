var webpack = require('webpack');
var path = require('path');

var root = [
  path.resolve(path.join(__dirname, 'src', 'scripts', 'components')),
  path.resolve(path.join(__dirname, 'src', 'scripts', 'stores')),
  path.resolve(path.join(__dirname, 'src', 'scripts', 'dispatcher')),
  path.resolve(path.join(__dirname, 'src', 'scripts', 'services')),
  path.resolve(path.join(__dirname, 'src', 'scripts', 'actions')),
  path.resolve(path.join(__dirname, 'src', 'scripts', 'constants'))
];

var webpackConfig = {
  devtool: 'inline-source-map',
  resolve: {
    root: root,
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?optional[]=es7.objectRestSpread' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel?optional[]=es7.objectRestSpread' }
    ]
  }
}


module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
