'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var _s = require('underscore.string');
var moduleName, camelizedModName, slugifiedModName;

describe('ujsm', function () {

  before(function() {
    moduleName = 'my module';
    camelizedModName = _s.camelize(moduleName);
    slugifiedModName = _s.slugify(moduleName);
  });

  describe('with default options', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          moduleName: moduleName,
          username: 'beep',
          browsers: []
        })
        .on('end', done);
    });

    it('creates files as expected', function () {
      assert.file([
        '.babelrc',
        '.eslintrc',
        'readme.md',
        '.travis.yml',
        '.editorconfig',
        'src/' + slugifiedModName + '.js',
        'mocha.config.js',
        'karma.conf.js',
        'test/server/' + slugifiedModName +  '.spec.js',
        'test/client/' + slugifiedModName +  '.spec.js'
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

    it('generates correct tests configulartion', function () {
      assert.fileContent('karma.conf.js', /test\/client\/\*\*\/\*\.js/);
      assert.fileContent('package.json', /mocha test\/server/);

      assert.fileContent('karma.conf.js', /\'PhantomJS\'/);
      assert.fileContent('karma.conf.js', /\'sinon-chai\'/);
      assert.fileContent('package.json', /\"karma-sinon-chai\"/);
      assert.fileContent('mocha.config.js', /\'sinon\'/);

      assert.noFileContent('karma.conf.js', /\'chai\'/);
      assert.noFileContent('package.json', /\"karma-chai\"/);
    });
  });

  describe('with reversed set of options', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          moduleName: moduleName,
          username: 'beep',
          isSeparated: false,
          inclSinon: false,
          browsers: ['includeChrome', 'includeFirefox']
        })
        .on('end', done);
    });

    it('creates expected test files', function () {
      assert.file([
        'test/' + slugifiedModName +  '.spec.js'
      ]);
    });

    it('generates correct tests configulartion', function () {
      assert.fileContent('karma.conf.js', /\'chai\'/);
      assert.fileContent('package.json', /\"karma-chai\"/);
      assert.fileContent('karma.conf.js', /\'Chrome\', \'Firefox\'/);

      assert.noFileContent('package.json', /\"karma-sinon-chai\"/);
      assert.noFileContent('karma.conf.js', /\'sinon-chai\'/);
      assert.noFileContent('mocha.config.js', /\'sinon\'/);
    });
  });
});
