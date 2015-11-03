'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

// Reference:
// https://github.com/sindresorhus/generator-nm/blob/master/app/index.js
module.exports = yeoman.generators.Base.extend({
  prompting: function () {
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
    }];

    this.prompt(prompts, function (props) {
      this.props = {
        moduleName: _s.slugify(props.moduleName),
        camelizedModuleName: _s.camelize(props.moduleName),
        name: this.user.git.name(),
        email: this.user.git.email(),
        username: props.username
      };

      done();
    }.bind(this));
  },

  writing: function () {
    var mv = function (from, to) {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    }.bind(this);

    var props = this.props;

    this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), props);

    mv('_package.json', 'package.json');
    mv('editorconfig', '.editorconfig');
    mv('eslintrc', '.eslintrc');
    mv('gitignore', '.gitignore');
    mv('travis.yml', '.travis.yml');
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
