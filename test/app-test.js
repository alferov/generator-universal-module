'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var _s = require('underscore.string');
var moduleName, camelizedModuleName, slugifiedModuleName;

describe('ujsm', function () {
  before(function (done) {
    moduleName = 'my module';
    camelizedModuleName = _s.camelize(moduleName);
    slugifiedModuleName = _s.slugify(moduleName);

    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        moduleName: moduleName,
        username: 'beep',
        onlyServer: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.eslintrc',
      'readme.md',
      '.travis.yml',
      '.editorconfig',
      'src/' + slugifiedModuleName + '.js',
      'test/' + slugifiedModuleName +  '.spec.js',
      'mocha.config.js'
    ]);
  });

  it('generates correct package.json', function () {
    assert.file('package.json');

    assert.JSONFileContent('package.json', {
      name: slugifiedModuleName,
      repository: 'beep/' + slugifiedModuleName,
      files: ['dist', 'src'],
      main: 'dist/' + slugifiedModuleName + '.js'
    });
  });

  it('generates correct readme', function () {
    var moduleNameDef = new RegExp('var ' + camelizedModuleName);
    var moduleNameDec = new RegExp('npm install --save ' + slugifiedModuleName);

    assert.fileContent('readme.md', moduleNameDef);
    assert.fileContent('readme.md',  moduleNameDec);
  });
});
