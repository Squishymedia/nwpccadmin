

module.exports = function(grunt) {
   grunt.initConfig({

       less: {
           // development: {
           //     options: {
           //         paths: ["assets/css"]
           //     },
           //     files: {"../css/npc.css": "less/npc.less"}
           // },
           production: {
               options: {
                   paths: ["assets/css"],
                   cleancss: true
               },
               files: {"../css/npc.css": "less/npc.less"}
           }
       }
   });
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.registerTask('default', ['less']);
};
