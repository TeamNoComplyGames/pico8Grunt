module.exports = function(grunt) {

  //Define our source code files path
  var srcPath = 'src/**/*.lua';
  var cartCodePath = 'luaCartCode.lua';
  var buildTasks = [
      'concat',
      'replace:noMultiLineComments',
      'replace:noComments',
      'replace:noEmptyLines',
      'replace:operatorWhiteSpace',
      'replace:singleSpace',
      'replace:blockIndentation',
      'replace:pico'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [srcPath],
        dest: cartCodePath,
      },
    },
    replace: {
      noComments: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /--.*/g,
          to: function (matchedContent) {
            return '';
          }
        }]
      },
      noMultiLineComments: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /(-- *\[\[)([\s\S]*?)(-- *\]\])/g,
          to: function (matchedContent) {
            return '';
          }
        }]
      },
      noEmptyLines: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /^\s*$\n/gm,
          to: function (matchedContent) {
            // The above regex matches empty lines, and the \n that creates the next one
            // Which allows us to remove the preceeding \n
            return '';
          }
        }]
      },
      operatorWhiteSpace: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /\s*[,+=><\-*/]+\s/g,
          to: function (matchedContent) {
            // Return the matched content without spaces
            return matchedContent.replace(/\s/g, '');
          }
        }]
      },
      singleSpace: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /  +/g,
          to: function (matchedContent) {
            // Return the matched content without spaces
            return matchedContent.replace(/  +/g, ' ');
          }
        }]
      },
      blockIndentation: {
        src: [cartCodePath],
        dest: cartCodePath,
        replacements: [{
          from: /\n\s+/g,
          to: function (matchedContent) {
            // Return the matched content without spaces
            return matchedContent.replace(/\n\s+/g, '\n');
          }
        }]
      },
      pico: {
        src: ['cart.p8'],
        dest: 'cart.p8',
        replacements: [{
          from: /(__lua__)(.*|[\s\S]*)(__gfx__)/g,
          to: function (matchedContent) {
            //Get our first two strings
            //Lua header needs newline, gfx does not
            var luaHeader = '__lua__\n';
            var gfxHeader = '__gfx__';
            var cartCode = grunt.file.read(cartCodePath);
            return luaHeader + cartCode + gfxHeader;
          }
        }]
      }
    },
    watch: {
      pico: {
        files: [srcPath],
        tasks: buildTasks,
        options: {
          spawn: false,
        }
      }
    }
  });
  //Regex to match correct lines of code in .p8 file
  //https://regex101.com/r/eZ1gT7/688
  // /(__lua__)(.*|[\s\S]*)(__gfx__)/g

  // Concatenation of files task
  grunt.loadNpmTasks('grunt-contrib-concat');
  //Text replace for the original .p8 file
  grunt.loadNpmTasks('grunt-text-replace');
  //Watch for file changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register our tasks
  grunt.registerTask('default', buildTasks);
  grunt.registerTask('build', buildTasks);
  //Alternative for 'grunt watch'
  grunt.registerTask('serve', ['watch']);

};
