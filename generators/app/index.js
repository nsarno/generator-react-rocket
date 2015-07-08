'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var execSync = require('child_process').execSync;

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the majestic ' + chalk.red('ReactRocket') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: _.capitalize(_.camelCase(this.appname))
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project description',
    }, {
      type: 'input',
      name: 'username',
      message: 'Your github username',
    }, {
      type: 'input',
      name: 'repo',
      message: 'The github repository for your project',
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { 
          appName: this.props.name,
          appDescription: this.props.descrition,
          username: this.props.username,
          repo: this.props.repo
        }
      );
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
      this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
      this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
      this.fs.copy(this.templatePath('src/scripts/actions/.keep'), this.destinationPath('src/scripts/actions/.keep'));
      this.fs.copy(this.templatePath('src/scripts/services/.keep'), this.destinationPath('src/scripts/services/.keep'));
      this.fs.copy(this.templatePath('dist/.keep'), this.destinationPath('dist/.keep'));
    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function() {
    var origin = 'git@github.com:' + this.props.username + '/' + this.props.repo + '.git';
    execSync('git init');
    execSync('git remote add origin ' + origin);
    execSync('git add --all');
    execSync('git commit -m "initial commit from generator"');
  }
});
