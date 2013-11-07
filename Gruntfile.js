
module.exports = function(grunt) {

  grunt.initConfig({

// =================Watch Task=========
watch: {
  options: {
    livereload: true,
    // nospawn: true,
    // interrupt: true,
    // debounceDelay: 250,
  },
  htmlHintWatch: {
    files: ['**/*.html','!node_modules/**/*.html'],
    // tasks: ['htmlhint'],
  },
  cssLessWatch: {
    files: ['**/*.less','!node_modules/**/*.less'],
    tasks: ['less', 'autoprefixer'],
  },
  cssWatch: {
    files: ['**/*.css','!node_modules/**/*.css'],
    // tasks: ['less'],
  },
  // cssSassWatch: {
    // files: ['**/*.scss','!node_modules/**/*.scss'],
    // tasks: ['sass'],
  // },
  // cssLintWatch: {
  //   files: ['**/*.css','!node_modules/**/*.css'],
  //   tasks: ['csslint'],
  // },
  jsWatch: {
    files: ['**/*.js','!node_modules/**/*.js'],
    // tasks: ['csslint'],
  },
  // jshintWatch: {
  //   files: ['Gruntfile.js'],
  //   tasks: ['jshint'],
  // }
},

// =================HymlPretty Task=========
  // 'html-prettyprinter': {
  //   single: {
  //     // HTML file to beauty
  //     src: 'index.html',

  //     // Destination of HTML file
  //     dest: 'index.html'
  //   }
  //     },
//=============
prettify: {
  options: {
    indent_size: 6,
    indent_char: ' ',
    max_char: 0,
    brace_style: 'expand',
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
  },
  one: {
    src: 'index2.html',
    dest: 'index2.html'
  }
},


// =================HymlVal Task===============done
htmllint: {
  all: ['**/*.html','!node_modules/**/*.html']
},

// =================HtmlLint Task===============done
htmlhint: {
  htmlhintgo: {
    options: {
      'tagname-lowercase': true,
      'attr-lowercase': true,
      // 'attr-value-double-quotes': true,
      'attr-value-not-empty': true,
      'doctype-first': true,
      'tag-pair': true,
      // 'tag-self-close': true,
      // 'spec-char-escape': true,
      'id-unique': true,
      // 'doctype-html5': true,
      'id-class-value': true,
      'style-disabled': true,
      // 'head-script-disabled': true,
      // 'img-alt-require': true
    },
    src: ['**/*.html','!node_modules/**/*.html']
  }
},

// =================cssSass Task=========
sass: {
  sassgo: {
    files: {
      "foundation.css": "foundation.scss"
    }
  }
},
// =================
 // sass: {
 //        dist: {
 //            files: {
 //                'scss/foundation.css': 'scss/foundation.scss'
 //            }
 //        }
 //    },


// =================cssLess Task=========
less: {
  lessgo: {
    files: {
      "styles.css": "less.less"
    }
  }
},

// =================cssLint Task=========done
csslint: {
  csslintgo: {
    src: ['**/*.css','!node_modules/**/*.css']
  }
},

// =================jsHint===================
jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      node: true,
      // es5: true,
      strict: false
    },
  all: ['Gruntfile.js']
},

// ==============Minify PNG and Jpeg========================done
imagemin: {
  options: {
    optimizationLevel: 3
  },
  imagemingoPNG:{
    files:[
      {
        expand: true,
        cwd: 'images/',
        src: ['**/*.png'],
        dest: 'temp/',
        ext: '.png'
      }
    ]
  },
  imagemingoJPG:{
    files:[
      {
        expand: true,
        cwd: 'images/',
        src: ['**/*.jpg'],
        dest: 'temp/',
        ext: '.jpg'
      }
    ]
  }
},

connect: {
    site1: {
      options: {
        hostname: '*',
        port: 9002
      // keepalive: true
        // base: 'www'
      }
    },
    site2: {
      options: {
        hostname: '*',
        port: 9003,
        keepalive: true,
        base: 'temp'
      }
    }
  },

    autoprefixer: {
    options: {
      // Task-specific options go here.
      browsers: ['> 1%', 'last 2 version']
    },
    your_target: {
      src: 'styles.css'
      // Target-specific file lists and/or options go here.
    },
  },
  copy: {
  main: {
    src: 'src/*',
    dest: 'dest/',
  },
},
  copy: {
  main: {
    src: ['index.html','styles.css', 'images/*', 'fonts/*', 'js.js', 'swipe.js'],
    dest: 'temp/',
  },
}



// =======================END==========================
});

// ===============Grunt Tasks==========================
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-html-prettyprinter');
grunt.loadNpmTasks('grunt-html');
grunt.loadNpmTasks('grunt-htmlhint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-imagemin');
// =======
grunt.loadNpmTasks('grunt-prettify');
// grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-copy');
// ===========Special Tasks=============================
grunt.registerTask('default', ['watch']);
grunt.registerTask('pretty', ['html-prettyprinter']);
grunt.registerTask('val', ['htmllint']);
grunt.registerTask('imin', ['imagemin']);
grunt.registerTask('pt', ['prettify']);
};

// =============IMPORTANT===========================
// ====add to html ====<script src="http://localhost:35729/livereload.js"></script>====
