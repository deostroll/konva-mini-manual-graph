/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    watch: {
      js: {
        files: 'src/main.js',
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    connect: {
      options:{
        livereload: true,
        port: 5000
      },
      livereload: {
        options:{
          middleware: function(connect) {
            var app = connect();
            var serveStatic = require('./node_modules/grunt-contrib-connect/node_modules/serve-static');
            app.use('/bower_components', serveStatic('./bower_components'));
            app.use(serveStatic('src'));
            return [app];
          }
        }

      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);

};
