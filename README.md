# grunt-mustache-html

> Compile mustache or hbs templates.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mustache-html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mustache-html');
```

## The "mustache_html" task

### Overview
Generate static HTML file from mustache|hbs JST for static HTML docs.

```js
grunt.initConfig({
  mustache_html: {
    development: {
      options: {
        src: 'src',
        dist: 'dist',
        type: 'mustache' // mustache Or hbs
      },
      globals: {
        analytics_id: 'UA-123456-1'
      }
    }
  }
});
```

Now the subtask `mustache_html:development` is available.

### options

#### options.src
Type: `String`
Default value: `src`

The source directory of your templates, the directory should be structured like:

```js
.
├── layout.mustache
├── pages
│   └── index.json
│   └── index.mustache
└── partials
    ├── nav.json
    └── nav.mustache
```

* `layout.mustache` must exist, and its name should have prefix `layout`
* `pages` contains the page templates that are eventually created, `.json` contains the page specify data
which can be also rendered in layout page. Use `{{>content}}` in `layout.mustache` to paste the page's content in.
* `partials` contains the partial templates that might be used in the page templates, `.json` contains the json formatted data, its name must be the save as the partial's.

#### options.dist
Type: `String`
Default value: `dist`

The destination directory of the created HTML files.

#### options.type
Type: `String`
Default value: `mustache`

The type of JST, can be `mustache` or `hbs`.

#### globals
Type: `Object`
Default value: {}

Contains global data. May be used to define environment-specific variables

## Test
Run `grunt test`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
