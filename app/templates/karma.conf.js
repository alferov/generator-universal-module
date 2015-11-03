var webpackConf = require('./webpack.config.js');
module.exports = function(config) {
  config.set({
    files: [
      // Each file acts as entry point for the webpack configuration
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/**/*.js'
    ],
    frameworks: ['mocha'],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    webpack: {
      module: webpackConf.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],
    browsers: ['PhantomJS']
  });
};
