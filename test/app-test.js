'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('ujsm', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        moduleName: 'my module',
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
      'src/module.js',
      'test/test.js'
    ]);
  });

  it('generates correct package.json', function () {
    assert.file('package.json');
    assert.JSONFileContent('package.json', {
      name: 'my-module',
      repository: 'beep/my-module',
      files: ['dist', 'src'],
      main: 'dist/module.js'
    });
  });

  it('generates correct readme', function () {
    assert.fileContent('readme.md', /var myModule/);
    assert.fileContent('readme.md', /npm install --save my-module/);
  });
});
