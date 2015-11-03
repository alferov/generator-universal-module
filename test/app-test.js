'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var generator;

describe('ujsm:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        moduleName: "my module",
        username: "beep"
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'readme.md',
      '.editorconfig',
      'src/module.js',
      'test/test.js'
    ]);
  });

  it('should add module name', function () {
    assert.fileContent('package.json', /"my-module"/);
  });

  it('should add GitHub username', function () {
    assert.fileContent('package.json', /"beep/);
  });

  it('should camelize package name', function () {
    assert.fileContent('readme.md', /myModule/);
  });
});
