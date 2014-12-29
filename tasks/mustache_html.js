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

    var globals = this.data.globals || {};

    var fs = require('fs'),
        hogan = require('hogan.js'),
        jstSuffix = '.' + options.type,
        matcher = new RegExp('\\' + jstSuffix + '$');

    // jsts path
    var layoutPath = options.src + '/layout' + jstSuffix,
        pagePath = options.src + '/pages',
        partialPath = options.src + '/partials';

    var pageData = {},
        partials = render(partialPath),
        pages = render(pagePath, partials);

    var layoutSrc = grunt.file.read(layoutPath),
        layout = hogan.compile(layoutSrc, { sectionTags: [{o:'_i', c:'i'}] });

    each(pages, function (page, name) {
        partials.content = page;
        page = layout.render(pageData[name] || {}, partials);
        grunt.file.write(options.dist  + '/' + name + '.html', page);
    });

    function render(path, partials) {

        var pages = {}; 
        grunt.file.recurse(path, function (abspath, rootdir, subdir, filename) {

            if (!filename.match(matcher)) return;

            var name = filename.replace(matcher, ''),
                dataPath = abspath.replace(matcher, '.json'),
                locals = merge({}, globals),
                data   = {};

            var templateSrc = grunt.file.read(abspath),
                template = hogan.compile(templateSrc, { sectionTags: [{o:'_i', c:'i'}] });

            if (grunt.file.exists(dataPath)) {
                data = JSON.parse(grunt.file.read(dataPath), function (key, value) {
                    if (value && (typeof value === 'string') && value.indexOf('function') === 0) {
                      try {
                        return new Function('return ' + value)();
                      } catch (ex) {
                        //faulty function, just return it as a raw value
                      }
                    }
                    return value;
                });
                merge(locals, data);
                pageData[name] = locals;
            }

            pages[name] = template.render(locals, partials);
        });
        return pages;
    }

    function each(obj, iter) {
        var keys = Object.keys(obj);
        for (var i=0,l=keys.length; i<l; i++) {
            iter.call(null, obj[keys[i]], keys[i]);
        }
    }

    function merge(init, extended) {
      each(extended, function(v, k) {
        init[k] = v;
      });

      return init;
    }

  });
};
