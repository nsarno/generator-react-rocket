var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var _ = require('lodash');

module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ], // CI => firefox, otherwise Chrome
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: _.merge(webpackConfig, { devtool: 'inline-source-map' }),
    webpackServer: {
      noInfo: true
    }
  });
};
