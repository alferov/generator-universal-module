'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

// Reference:
// https://github.com/sindresorhus/generator-nm/blob/master/app/index.js
module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    this.log(yosay([
      'Welcome to the',
      chalk.red('Universal JavaScript Module'),
      'generator! UJSM leverages the following superpowers:',
      chalk.yellow('ES2015, Babel, Webpack, Mocha,'),
      chalk.yellow('Chai, Karma, Isparta, ESLint')
    ].join(' ')));

    var prompts = [{
      name: 'moduleName',
      message: 'What is the name of your module?',
      default: this.appname.replace(/\s/g, '-')
    }, {
      name: 'username',
      message: 'What is your GitHub username?',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a username';
      }
    }, {
      name: 'isSeparated',
      message: 'Would you like to keep your server/client tests separate?',
      type: 'confirm',
      default: true
    }, {
      name: 'inclSinon',
      message: 'Would you like to include Sinon?',
      type: 'confirm',
      default: true
    }, {
      type: 'checkbox',
      name: 'browsers',
      message: 'What karma launchers would you like to include?',
      choices: [{
        name: 'PhantomJS',
        value: 'includePhantomJS',
        checked: true
      }, {
        name: 'Chrome',
        value: 'includeChrome',
        checked: false
      }, {
        name: 'Firefox',
        value: 'includeFirefox',
        checked: false
      }]
    }];

    this.prompt(prompts, function(props) {
      var browsers = props.browsers;

      var browserIncluded = function(browsers, browser) {
        return browsers && browsers.indexOf(browser) !== -1;
      };

      var normalizeBrowserNames = function(browsers) {
        return browsers.slice().map(function(item) {
          return item.replace(/^include/, '');
        });
      };

      this.props = {
        moduleName: _s.slugify(props.moduleName),
        camelizedModuleName: _s.camelize(props.moduleName),
        name: this.user.git.name(),
        email: this.user.git.email(),
        username: props.username,
        isSeparated: props.isSeparated,
        inclSinon: props.inclSinon,
        includePhantom: browserIncluded(browsers, 'includePhantomJS'),
        includeChrome: browserIncluded(browsers, 'includeChrome'),
        includeFirefox: browserIncluded(browsers, 'includeFirefox'),
        browsers: normalizeBrowserNames(browsers)
      };

      // Use PhantomJS as a default launcher if launcher hasn't been choosen
      if (!this.props.includeChrome && !this.props.includeFirefox) {
        this.props.includePhantom = true;
        this.props.browsers = ['PhantomJS'];
      }

      done();
    }.bind(this));
  },

  writing: function() {
    var mv = function(from, to) {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    }.bind(this);

    var cp = function(from, to) {
      this.fs.copy(this.destinationPath(from), this.destinationPath(to));
    }.bind(this);

    var props = this.props;

    this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), props);

    mv('_package.json', 'package.json');
    mv('editorconfig', '.editorconfig');
    mv('eslintrc', '.eslintrc');
    mv('gitignore', '.gitignore');
    mv('travis.yml', '.travis.yml');
    mv('src/module.js', 'src/' + this.props.moduleName + '.js');

    if (props.isSeparated) {
      cp('test/test.js', 'test/server/' + this.props.moduleName + '.spec.js');
      mv('test/test.js', 'test/client/' + this.props.moduleName + '.spec.js');
    } else {
      mv('test/test.js', 'test/' + this.props.moduleName + '.spec.js');
    }
  },

  postwriting: function() {
    if (!this.options.skipInstall) {
      this.spawnCommandSync('git', ['init']);
    }
  },

  install: function() {
    this.installDependencies({ bower: false });
  }
});
