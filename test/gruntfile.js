'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    //ディレクトリの定義
    dir: {
      dev:    'www/_dev/',
      build:  'www/build/',
      script: 'assets/_script/',
      js:     'assets/js/',
      jsCp:   'assets/js/components/',
      scss:   'assets/_scss/',
      css:    'assets/css/',
      img:    'assets/img/',
      projectRoot: ''
    },


    //bower task
    bower: {
      install: {
        options: {
          targetDir: './_lib', //ライブラリの主要ファイル配置先
          layout: 'byComponent', // レイアウトbyType or byComponent
          verbose: false,　// ログの詳細を出すかどうか
          install: true, //grunt init実行時にbower installを実行
          cleanTargetDir: false, // targetDirを削除
          cleanBowerDir: false // bowerのcomponentsディレクトリを削除するかどうか
        }
      }
    },


    //bowerライブラリ郡から主要ファイル（_lib）コピー
    copy: {
      init: {
        files: [
          {
            expand: true,//ダイナミック拡張有効
            cwd: '_lib/jquery/',
            src: ["*"],
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.jsCp %>',
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: '_lib/html5-boilerplate/js/vendor/',
            src: ["**/modernizr*.js"],
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.jsCp %>',
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: '_lib/html5-boilerplate/',
            src: ["index.html"],
            dest: '<%= dir.dev %>',
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: '_lib/html5-boilerplate/css/',
            src: ["main.css"],
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
            filter: 'isFile',
            dot: false,
            rename: function(dest, src) {
            return dest + 'main.scss';
            }
          }, {
            expand: true,
            cwd: '_lib/normalize-scss/',
            src: ["*"],
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
            filter: 'isFile',
            dot: false
          }
        ]
      },

      //_devからbuildへ必要なファイルをコピー
      build: {
        files: [
          {
            expand: true,
            cwd: "<%= dir.dev %>",
            src: ["**/*.html"],
            dest: "<%= dir.build %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>",
            src: ["**/*.css"],
            dest: "<%= dir.build %><%= dir.css %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>",
            src: ["**/*.{gif,jpeg,jpg,png,svg,webp}"],
            dest: "<%= dir.build %><%= dir.img %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>",
            src: ["**/*.js"],
            dest: "<%= dir.build %><%= dir.js %>",
            filter: 'isFile',
            dot: false
          }
        ]
      }
    },


    //コマンド　grunt build（すべてではない）
    //_libを削除,build以下に納品ファイルまとめ
    clean: {
      //init: [''],
      build: ['_lib/','.sass-cache']
    },



    //_dev以下の監視
    watch: {
      livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: ['<%= dir.dev %>**/*.html']
      },
      scss: {
        files: '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>**/*.scss',
        //tasks: ['compass']
        tasks: ['compassMultiple','autoprefixer']
      },
      script: {
        files: '<%= dir.dev %><%= dir.projectRoot %><%= dir.script %>**/*.js',
        tasks: ['uglify']
      }
    },


    //ローカルサーバー起動後自動でオープン
    connect: {
      options: {
        port: 9999,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
            base: '<%= dir.dev %>',
            open: true
        }
      }
    },


//    //cofeeコンパイル
//    coffee: {
//      options: {
//        bare: true
//      },
//      files: {
//        expand: true,
//        cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.coffee %>",
//        src: ["**/*.coffee"],
//        dest: "<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>",
//        ext: ".js"
//      }
//    },


    compassMultiple: {
      options: {
        sassDir:   '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
        cssDir:    '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>',
        imagesDir: '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
        environment: 'production',
        outputStyle: 'expanded',
        time: true
      },
      common : {}
    },


    autoprefixer: {
      target: {
        expand: true,
        flatten: true,
        src:  '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>*.css',
        dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>'
      }
    },


    //CSSミニファイ
    cssmin: {
      combine: {
        files: {
          '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>main.css': ['<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>normalize.css', '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>main.css']
        }
      }
    },


    //CSSの構文チェック
    csslint: {
      options: {
        "import": false,
        "bulletproof-font-face": false,
        "compatible-vendor-prefixes": false,
        "important": false,
        "regex-selectors": false,
        "adjoining-classes": false,
        "unqualified-attributes": false,
        "fallback-colors": false,
        "zero-units": false,
        "box-sizing": false,
        "font-sizes": false
      },
      src: ['<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>*.css']
    },

    //JSのミニファイ
    uglify: {
      options: {
        preserveComments: 'some' //コメントは残す
      },
      js: {
        files: {
          '<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>script_min.js': ['<%= dir.dev %><%= dir.projectRoot %><%= dir.script %>*.js']
        }
      }
    },


    //JSの構文チェック
    jshint: {
      options: {
        ignores: ['<%= dir.dev %><%= dir.projectRoot %><%= dir.jsCp %>*.js'],
        //jshintrc: '.jshintrc'
      },
      all: ['gruntfile.js','<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>*.js']
    }
    
  });



  //タスクをすべて読み込む
  require('load-grunt-tasks')(grunt);
  
  
  //grunt initでbowerインストール＆コピー、もろもろディレクトリ構築
  grunt.registerTask("init", 
    function() {
      grunt.task.run('bower:install');
      grunt.task.run('copy:init');
      grunt.file.defaultEncoding = 'utf8';
      grunt.file.mkdir('www');
      grunt.file.mkdir('www/_dev');
      grunt.file.mkdir('www/_dev/assets');
      grunt.file.mkdir('www/_dev/assets/css');
      grunt.file.mkdir('www/_dev/assets/img');
      grunt.file.mkdir('www/_dev/assets/_scss');
//    grunt.file.mkdir('www/_dev/assets/_coffee');
      grunt.file.mkdir('www/_dev/assets/js');
      grunt.file.mkdir('www/_dev/assets/js/components');
      grunt.file.mkdir('www/build');
      grunt.file.mkdir('www/build/assets');
      grunt.file.mkdir('www/build/assets/css');
      grunt.file.mkdir('www/build/assets/img');
      grunt.file.mkdir('www/build/assets/js');
      grunt.file.mkdir('www/build/assets/js/components');
    }
  );


  //gruntでローカルサーバーと監視
  grunt.registerTask("default", [
    'uglify',
    //'compass',
    'compassMultiple',
    'connect:livereload',
    'watch'
  ]);


  //buildでJS、CSSのミニファイ、build以下にコピー
  return grunt.registerTask("build", [
    'clean:build',
    'copy:build',
    'jshint',
    'cssmin',
    'csslint',
  ]);


};
