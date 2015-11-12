'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var _s = require('underscore.string');
var moduleName, camelizedModName, slugifiedModName;

describe('ujsm', function () {

  before(function() {
    moduleName = 'my module';
    camelizedModName = _s.camelize(moduleName);
    slugifiedModName = _s.slugify(moduleName);
  });

  describe('with standart set of options', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          moduleName: moduleName,
          username: 'beep'
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        '.eslintrc',
        'readme.md',
        '.travis.yml',
        '.editorconfig',
        'src/' + slugifiedModName + '.js',
        'test/' + slugifiedModName +  '.spec.js',
        'mocha.config.js',
        'karma.conf.js'
      ]);
    });

    it('generates correct package.json', function () {
      assert.file('package.json');
      assert.JSONFileContent('package.json', {
        name: slugifiedModName,
        repository: 'beep/' + slugifiedModName,
        files: ['dist', 'src'],
        main: 'dist/' + slugifiedModName + '.js'
      });
    });

    it('generates correct readme', function () {
      var moduleNameDef = new RegExp('var ' + camelizedModName);
      var moduleNameDec = new RegExp('npm install --save ' + slugifiedModName);

      assert.fileContent('readme.md', moduleNameDef);
      assert.fileContent('readme.md',  moduleNameDec);
    });
  });

  describe('with tests separation', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          moduleName: moduleName,
          username: 'beep',
          isSeparated: true
        })
        .on('end', done);
    });

    it('separates test files', function () {
      assert.file([
        'test/server/' + slugifiedModName +  '.spec.js',
        'test/client/' + slugifiedModName +  '.spec.js'
      ]);
    });

    it('generates correct tests configulartion', function () {
      var moduleNameDef = new RegExp('var ' + camelizedModName);
      var moduleNameDec = new RegExp('npm install --save ' + slugifiedModName);

      assert.fileContent('karma.conf.js', /test\/client\/\*\*\/\*\.js/);
      assert.fileContent('package.json', /mocha test\/server/);
    });
  });
});
