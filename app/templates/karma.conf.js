var webpackConf = require('./webpack.config.js');
module.exports = function(config) {
  config.set({
    files: [
      // Each file acts as entry point for the webpack configuration
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/<% if (isSeparated) { %>client/<% } %>**/*.js'
    ],
    frameworks: ['mocha', <% if (inclSinon) { %>'sinon-chai'<% } else { %>'chai'<% } %>],
    preprocessors: {
      'test/<% if (isSeparated) { %>client/<% } %>**/*.js': ['webpack']
    },
    webpack: {
      module: webpackConf.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    browsers: [<%- browsers.map(function(item) { return '\'' + item + '\'';  }).join(', ') %>],
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      <% if (inclSinon) { %>require('karma-sinon-chai'),<% } else { %> require('karma-chai'), <% } %>
      <% if (includePhantom) { %>require('karma-phantomjs-launcher'),<% } %>
      <% if (includeChrome) { %>require('karma-chrome-launcher'),<% } %>
      <% if (includeFirefox) { %>require('karma-firefox-launcher'),<% } %>
      require('karma-spec-reporter')
    ],
  });
};
