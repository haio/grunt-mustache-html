/*
 * grunt-mustache-html
 * https://github.com/haio/grunt-mustache-html
 *
 * Copyright (c) 2013 zhongyu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'dist'],
    },

    // Configuration to be run (and then tested).
    mustache_html: {
      default_options: {
        options: {
            src: 'test/fixtures/default'
        }
      },
      custom_options: {
        options: {
            src: 'test/fixtures/custom',
            dist: 'tmp',
            type: 'hbs'
        },
        globals: {
          dev: 'this is global'
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mustache_html', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
