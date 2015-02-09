module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'dist/css/style.css'
            },
            js: {
                src: [
                    'js/*'
                ],
                dest: 'dist/js/app.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js'],
                    'dist/lib/angular.min.js': ['lib/angular.js']
                }
            }
        },
        copy: {
            main: {
                src: 'lib/bootstrap.min.css',
                dest: 'dist/lib/bootstrap.min.css'
            }
        },
        'string-replace': {
            dist: {
            files: {
              'dist/index.html': 'index.html',
            },
            options: {
              replacements: [{
                pattern: 'css/autosuggest.css',
                replacement: 'css/style.min.css'
              }, {
                pattern: 'js/autosuggest.js',
                replacement: 'js/app.min.js'
              }, {
                pattern: 'lib/angular.js',
                replacement: 'lib/angular.min.js'
              }]
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'copy:main','string-replace']);
};