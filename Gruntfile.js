module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false
            }
        },
        jshint: {
            options: {
                jshintrc: "./.jshintrc"
            },
            files: ['lib/*.js', 'tests/**/*.js']
        }

    });

    grunt.registerTask('compliment', function () {
        grunt.log.writeln('You are so awesome!');
    });



    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);


};