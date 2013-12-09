/*
 * grunt-mustache-html
 * https://github.com/haio/grunt-mustache-html
 *
 * Copyright (c) 2013 zhongyu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mustache_html', 'Compile mustache|hbs templates to HTML', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      src: 'src',
      dist: 'dist',
      type: 'mustache'
    });
   
    var fs = require('fs'),
        hogan = require('hogan.js'),
        jstSuffix = '.' + options.type,
        matcher = new RegExp('\\' + jstSuffix + '$');

    // jsts path
    var layoutPath = options.src + '/layout' + jstSuffix,
        pagePath = options.src + '/pages',
        partialPath = options.src + '/partials',
        context = {},
        partials = [];

    // retrieve layout
    var pageLayout = grunt.file.read(layoutPath);

    // retrieve partials
    grunt.file.recurse(partialPath, function (abspath, rootdir, subdir, filename) {
        if (!filename.match(matcher) && !filename.match(/\.json/)) return;

        var name = filename.replace(matcher, ''),
            dataPath = abspath.replace(matcher, '.json'),
            data = {};

        var templateSrc = grunt.file.read(abspath),
            template = hogan.compile(templateSrc, { sectionTags: [{o:'_i', c:'i'}] });

        if (grunt.file.exists(dataPath)) {
            data = JSON.parse(grunt.file.read(dataPath));
        }
        
        partials[name] = template.render(data);
    });

    // retrieve pages
    grunt.file.recurse(pagePath, function (abspath, rootdir, subdir, filename) {
        if (!filename.match(matcher)) return;

        var name = filename.replace(matcher, ''),
            templateSrc = grunt.file.read(abspath),
            template = hogan.compile(templateSrc, { sectionTags: [{o:'_i', c:'i'}] });

        // render parital in layout
        partials.content = template.render(context, partials);

        var page = hogan.compile(pageLayout, { sectionTags: [{o:'_i', c:'i'}] });
        page = page.render(context, partials);

        grunt.file.write(options.dist  + '/' + name + '.html', page);
    });
  });
};
