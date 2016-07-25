'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    //Configurations will be loaded here.
    //Ask for user input
    prompting: function () {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Project Name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
        }, function (answers) {
            this.props = answers;
            this.log(answers.name);
            done();
        }.bind(this));
    },
    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function () {

            mkdirp.sync('assets/build/js');
            mkdirp.sync('assets/build/css');
            mkdirp.sync('assets/build/fonts');
            mkdirp.sync('assets/build/images');
            mkdirp.sync('assets/src/css');
            mkdirp.sync('assets/src/fonts');
            mkdirp.sync('assets/src/images');
            mkdirp.sync('assets/src/js/theme');

            mkdirp.sync('assetsCms/build/js');
            mkdirp.sync('assetsCms/build/css');
            mkdirp.sync('assetsCms/build/fonts');
            mkdirp.sync('assetsCms/build/images');
            mkdirp.sync('assetsCms/src/css');
            mkdirp.sync('assetsCms/src/fonts');
            mkdirp.sync('assetsCms/src/images');
            mkdirp.sync('assetsCms/src/js/theme');

            this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), { name: this.props.name });
            this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), { name: this.props.name });
            this.fs.copy(this.templatePath('_config.rb'), this.destinationPath('config.rb'));
            this.fs.copy(this.templatePath('_cmsconfig.rb'), this.destinationPath('cmsconfig.rb'));
            this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'));

            this.fs.copy(this.templatePath("assets/src/**/*"), this.destinationPath('assets/src'));
            this.fs.copy(this.templatePath("assetsCms/src/**/*"), this.destinationPath('assetsCms/src'));

            //this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));
        },

        //Copy application files
        //app: function () {
        //    ///// Angular app
        //    this.fs.copy(this.templatePath('_assets/_src/_js/_app/_app.js'), this.destinationPath('assets/src/js/app/app.js'));
        //}
    },
    install: function () {
        this.installDependencies();
    }
});
