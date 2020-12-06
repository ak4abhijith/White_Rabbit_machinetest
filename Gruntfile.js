module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // sass: {
    //   dist: {
    //     files: {
    //       'css/style.css': 'scss/style.scss'
    //     }
    //   }
    // },
    concat: {
      js: {
        src: ['src/js/*.js'],
        dest: 'build/js/concat.js',
      },
      css: {
        src: ['src/css/style.css','src/css/certifications.css'],
        dest: 'build/css/style.css'
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: false
        }
      },
      build: {
        src: ["build/js/concat.js"],
        dest: "build/js/script.js"
      }
    },
    htmlmin: {
      dist: {
          options: {
              removeComments: true,
              collapseWhitespace: true
          },
          expand: true,
          cwd: 'src/',
          src: ['*.php','!header.php','!footer.php','!sendmail.php'],
          dest: 'build/'
      }
    },
    cssmin: {
      css: {
        src: 'build/css/style.css',
        dest: 'build/css/style.css',
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images/'
      }
    },
    uncss: {
        dist: {
          options: {
              //ignore: [/js-.+/, '.special-class'],
              //ignoreSheets: [/fonts.googleapis/],
          },
          expand: true,
          src: [''],
          dest: 'build/css/tidy.css'
          // files: {
          //     'build/css/tidy.css': ['src/*.php']
          // }
        }
    },
      // webp: {
      //   files: {
      //     expand: true,
      //     cwd: 'src/images/',
      //     src: ['mob-g*.png'],
      //     dest: 'build/images/'
      //   },
      //   options: {
      //     binpath: require('webp-bin').path,
      //     preset: 'photo',
      //     verbose: true,
      //     quality: 100,
      //     alphaQuality: 100,
      //     compressionMethod: 6,
      //     segments: 4,
      //     psnr: 42,
      //     sns: 50,
      //     filterStrength: 40,
      //     filterSharpness: 3,
      //     simpleFilter: true,
      //     partitionLimit: 50,
      //     analysisPass: 6,
      //     multiThreading: true,
      //     lowMemory: false,
      //     alphaMethod: 0,
      //     alphaFilter: 'best',
      //     alphaCleanup: true,
      //     noAlpha: false,
      //     lossless: false
      //   }
      // },
      // svgmin: {
      //   options: {
      //     plugins: [
      //       {
      //         removeViewBox: false
      //       },
      //       {
      //         removeUselessStrokeAndFill: false
      //       },
      //       {
      //         removeAttrs: {
      //           attrs: [
      //             'xmlns'
      //           ]
      //         }
      //       }
      //     ]
      //   },
      //   dist: {
      //     files: {
      //       expand: true,
      //       cwd: 'src/images/',
      //       src: ['**/*.{svg}'],
      //       dest: 'build/images/'
      //     }
      //   }
      // },
    //   critical: {
    //     test: {
    //         options: {
    //             inline: true,
    //             extract: true,
    //             minify: true,
    //             css: [
    //               'build/css/concat.css'
    //             ],
    //             dimensions: [
    //               {
    //                 height: 200,
    //                 width: 500,
    //               },
    //               {
    //                 height: 1080,
    //                 width: 1920,
    //               },
    //             ],
    //         },
    //         ignore: {
    //           atrule: ['@font-face','body','html','div']
    //         },
    //         src: 'src/about.php',
    //         dest: "build/about.php"
    //     }
    // },
    // critical_css: {
    //   options: {
    //     excludeSelectors: [
    //       'html, body, div' // Prevent the CSS reset from appearing inline.
    //     ],
    //     enabledOrigins: [
    //       'localhost'       // Only include locally hosted styles.
    //     ]
    //   },
    //   keepInlineStyles: true,
    //   desktop: {
    //     options: {
    //       width: 1200,
    //       height: 760,
    //     },
    //     url: 'http://server.local/developer/p/port-of-muziris/build/about.php',
    //     file: 'build/css/concat.css'
    //   },
    //   mobile: {
    //     options: {
    //       width: 400,
    //       height: 800,
    //     },
    //     url: 'about.php',
    //     file: 'build/css/concat.css'
    //   },
    // },
    watch: {
      // sass: {
      //   files: ['src/scss/style.scss'], // ** any directory; * any file
      //   tasks: ['sass']
      // },
      css: {
        files: ['src/css/*.css'], // ** any directory; * any fileN
        tasks: ['concat','cssmin'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      htmlmin: {
        files: ['src/*.php'],
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      },
      image: {
        files: ['src/images/'],
        tasks: ['image','webp','svgmin'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('htmlmin', ['htmlmin']);
  // grunt.registerTask('sass', ['sass']);
  grunt.registerTask('css', ['concat', 'cssmin']);
  grunt.registerTask('js', ['concat', 'uglify']);
  // grunt.registerTask('webp', ['webp']);
  // grunt.registerTask('image', ['imagemin','webp','svgmin']);
  grunt.registerTask('imagemin', ['imagemin']);
  grunt.registerTask('uncss', ['uncss']);
  // grunt.registerTask('svgmin', ['svgmin']);
  grunt.registerTask('critical_css', ['critical_css']);
  grunt.registerTask('critical', ['grunt-critical']);
  grunt.registerTask('jshint', ['jshint']);

  // grunt.loadNpmTasks('node-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-webp');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-critical-css');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  /* grunt.registerTask('default', 'concat uglify cssmin'); */
};    