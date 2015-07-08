'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var execSync = require('child_process').execSync;

var name = 'MyApp';
var desc = 'My app description.';
var username = 'foo';
var repo = 'myapp';

describe('react-rocket:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ 
        name: name, 
        description: desc,
        username: username,
        repo: repo
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.gitignore',
      'gulpfile.js',
      'webpack.config.js',
      'src/index.html',
      'src/scripts/components/App.jsx',
      'src/scripts/dispatcher/Dispatcher.js',
      'src/scripts/constants/Constants.js'
    ]);
  });

  it('inits a git repository', function () {
    assert.file(['.git/config']);
  });

  it('adds a remote origin', function () {
    assert.fileContent('.git/config', new RegExp('[remote "origin"]'));
    assert.fileContent('.git/config', new RegExp('url = git@github.com:' + username + '/' + repo + '.git'));
  });

  it('commits the files', function () {
    execSync('git log > gitlog.txt');
    assert.file('gitlog.txt');
    assert.fileContent('gitlog.txt', new RegExp('initial commit from generator'));
  });
});
