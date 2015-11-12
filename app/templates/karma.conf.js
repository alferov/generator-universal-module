var webpackConf = require('./webpack.config.js');
module.exports = function(config) {
  config.set({
    files: [
      // Each file acts as entry point for the webpack configuration
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/<% if (isSeparated) { %>client/<% } %>**/*.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'test/<% if (isSeparated) { %>client/<% } %>**/*.js': ['webpack']
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
      require('karma-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],
    browsers: ['PhantomJS']
  });
};
