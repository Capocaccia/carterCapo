module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

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
        watch: {
            options: {
                spawn: false
            },

            scripts: {
                files: ['src/js/*.js']
            },

            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass', 'postcss']
            }
        },
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/app.js": "src/js/*.js"
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'src/css/**/*.css',
                        'src/*.html',
                        'src/js/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
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
                src: 'src/css/*.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask("default", ["babel"]);

    // Default task(s).
    grunt.registerTask('default', ['browserSync', 'watch', 'babel']);
};