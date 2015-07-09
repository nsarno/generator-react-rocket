'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var execSync = require('child_process').execSync;

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your component name'
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
        this.templatePath('_component.jsx'),
        this.destinationPath('src/scripts/components/' + this.props.name + '.jsx'),
        { name: this.props.name }
      );
    }
  }
});
