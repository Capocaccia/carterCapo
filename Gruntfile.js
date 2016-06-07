module.exports = function (grunt) {

    "use strict";

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/css/style.css': 'src/scss/style.scss'
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['last 4 version', 'ie 7', 'ie 8', 'ie 9'],
                    map: true
                },
                src: 'css/style.css'
            }
        },

        watch: {
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            twig: {
                files: ['Site/Views/*.twig']
            },
            js: {
                files: ['jscripts/src/*.js']
            },
            options: {
                spawn: false
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 4 version']}),
                    require('postcss-flexbugs-fixes')
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('style', ['sass', 'postcss']);

};