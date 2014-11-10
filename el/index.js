'use strict'
var yeoman = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var spawn = require('child_process').spawn;

module.exports = yeoman.generators.Base.extend({
    askFor:function(){
        var done = this.async();
        var prompts = [{
            name:"externalStyle",
            message:"Would you like an external css file for this element?",
            type:"confirm"
        },
        {
            name:"externalJs",
            message:"Would you like an external js file for this element?",
            type:'confirm',
            default:false
        }];
        this.prompt(prompts,function(answers){
            this.externalStyle = answers.externalStyle;
            this.externalJs = answers.externalJs;
            done();
        }.bind(this));
    },
    el:function(){
        this.elementName = this.args[0];
        if(!this.elementName){
            console.error("Element name required");
            console.error("ex:yo mt:el my-element");
            return;
        }
        if(this.elementName.indexOf('-')===-1){
            console.error("Element name must contain a dash '-'");
            console.error("ex:yo mt:el my-element");
            return;
        }
        // create the template element
        // el = "mt-button/mt-button"
        var el = path.join(this.elementName,this.elementName);
        // pathToEl = "app/elements/mt-button/mt-button"
        var pathToEl = path.join('app/elements',el);
        this.template('_element.html',pathToEl+'.html');
        this.template('_index.html','app/elements/'+this.elementName+'/index.html');
        this.template('_demo.html','app/elements/'+this.elementName+'/demo.html');
        if(this.externalStyle){
            this.template('_element.css',pathToEl+'.css');
        }
        if(this.externalJs){
            this.template('_element.js',pathToEl+'.js');
        }
    }
});