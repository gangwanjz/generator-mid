'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var MtGenerator = yeoman.generators.Base.extend({
    init: function () {
        // init
        this.pkg = require('../package.json');
        this.testFramework = 'mocha' || this.options['test-framework'];
        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({
                    skipMessage: this.options['skip-install-message']
                });
            }
        });
    },
    askFor: function () {
        var done = this.async();
        //建议使用this.log()，因为非命令模式下console.log()不会显示
        this.log(yosay("Out of the box I include HTML5 Boilerplate and Polymer!"));
        var prompts = [
            {
                name: 'includeCore',
                message: 'Would you like to include core-element ?',
                type: 'confirm'
            },
            {
                name:"includePaper",
                message:"Would you like to include paper-element ?",
                type:"confirm"
            }
        ];
        this.prompt(prompts, function (answers) {
            this.includeCore = answers.includeCore;
            this.includePaper = answers.includePaper;
            done();
        }.bind(this));
    },
    app: function () {
        //创建目录
        this.mkdir('app');
        this.mkdir('app/elements');
        this.mkdir('app/lib');
        this.mkdir('app/doc');
        this.mkdir('app/images');
        //this.copy();第一个参数为原文件名，默认目录是 app/templates,第二个参数为目标文件
        this.copy('index.html', 'app/index.html');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
    },
    gulp: function () {
        var done = this.async();
        //安装gulp模块，this.npmInstall()会解决模块的安装问题，对同一模块只安装一次
        this.npmInstall(['gulp','gulp-imagemin','gulp-minify-css','gulp-htmlmin','gulp-uglify','gulp-jshint','gulp-rename','gulp-clean'], {'saveDev': true}, done);
        this.template('gulpfile.js');
    },
    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }


});

module.exports = MtGenerator;
