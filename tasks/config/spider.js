
/**
 * Compile SpiderScript files to JavaScript.
 *
 * ---------------------------------------------------------------
 *
 * Compiles spiderscript files from `assest/spider` into Javascript and places them into
 * `.tmp/public/js` directory.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-spider-script
 */
module.exports = function(grunt) {

  grunt.config.set('spider_script', {
    dev: {
      options: {
        sourcemap: false
      },
      files: [{
        expand: true,
        cwd: 'assets/js/',
        src: ['**/*.spider'],
        dest: '.tmp/public/js/',
        ext: '.js'
      }, {
        expand: true,
        cwd: 'assets/js/',
        src: ['**/*.spider'],
        dest: '.tmp/public/js/',
        ext: '.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-spider-script');
  
};