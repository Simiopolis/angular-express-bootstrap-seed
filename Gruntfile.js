var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        express: {
            server: {
                options: {
                    port: 3000,
                    server: path.resolve('./app')
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('default', ['express', 'express-keepalive']);
};
