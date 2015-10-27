'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('Ujsm') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var mv = function (from, to) {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    }.bind(this);

    this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), {});

    mv('_package.json', 'package.json');
    mv('editorconfig', '.editorconfig');
    mv('jshintrc', '.jshintrc');
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
