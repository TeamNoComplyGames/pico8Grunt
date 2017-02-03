module.exports = function(grunt) {

  //Define our source code files path
  var srcPath = 'src/**/*.lua';
  var cartCodePath = 'luaCartCode.lua';

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
        tasks: ['concat', 'replace'],
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
  grunt.registerTask('default', ['concat', 'replace']);
  grunt.registerTask('build', ['concat', 'replace']);
  //Alternative for 'grunt watch'
  grunt.registerTask('serve', ['watch']);

};
