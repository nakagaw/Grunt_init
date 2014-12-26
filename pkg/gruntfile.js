'use strict';

module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //ディレクトリの定義
    dir: {
      dev:    'htdocs/_dev/',
      release:'htdocs/release/',
      //coffee: 'assets/_coffee/',
      js:     'assets/js/',
      assets: 'assets/js/components/',
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
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.assets %>',
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: '_lib/html5-boilerplate/js/vendor/',
            src: ["**/modernizr*.js"],
            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.assets %>',
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
      //_devからreleaseへ必要なファイルをコピー
      build: {
        files: [
          {
            expand: true,
            cwd: "<%= dir.dev %>",
            src: ["**/*.html"],
            dest: "<%= dir.release %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>",
            src: ["**/*.css"],
            dest: "<%= dir.release %><%= dir.css %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>",
            src: ["**/*.{gif,jpeg,jpg,png,svg,webp}"],
            dest: "<%= dir.release %><%= dir.img %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>",
            src: ["**/*.js"],
            dest: "<%= dir.release %><%= dir.js %>",
            filter: 'isFile',
            dot: false
          }
        ]
      }
    },
    
//    //SASSコンパイル
//    sass: {
//      dist: {
//        options: {
//          style: 'expanded',
//          sourcemap: 'none'//,
//          //compass: 'true'
//        },
//        files: [
//          {
//            expand: true,
//            cwd: '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
//            src: ['*.scss'],
//            dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>',
//            ext: '.css'
//          }
//        ]
//      }
//    },
    

    compass: {
      dist: {
          options: {
              sassDir:                 '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
              cssDir:                  '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>',
              imagesDir:               '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
              generatedImagesDir:      '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
              httpGeneratedImagesPath: '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
              javascriptsDir:          '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
              outputStyle: 'expanded',
              noLineComments: true,
              relativeAssets: false,
              assetCacheBuster: false
          }
      }
    },
    
//    compassMultiple: {
//      options: {
//        sassDir:   '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>',
//        cssDir:    '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>',
//        imagesDir: '<%= dir.dev %><%= dir.projectRoot %><%= dir.img %>',
//        environment: 'production',
//        outputStyle: 'expanded'
//      }
//    },
    
    autoprefixer: {
      target: {
        expand: true,
        flatten: true,
        src:  '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>*.css',
        dest: '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>'
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


    
    //_dev以下の監視
    watch: {
      livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'gruntfile.js',
            '<%= dir.dev %>**/*.html',
            '<%= dir.dev %>**/*.js',
            '<%= dir.dev %>**/*.css'
        ]
      },
      html: {
        files: '<%= dir.dev %><%= dir.projectRoot %>**/*.html'
      },
      scss: {
        files: '<%= dir.dev %><%= dir.projectRoot %><%= dir.scss %>**/*.scss',
        tasks: ['compass']
      },
      js: {
        files: '<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>**/*.js',
//        tasks: ['coffee']
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
    
    
    //コマンド　grunt release（すべてではない）
    //_libを削除,release以下に納品ファイルまとめ
    clean: {
      init: ['_lib/'],
      build: ['<%= dir.release %>']
    },
    
    //CSSミニファイ
    cssmin: {
      combine: {
        files: {
          '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>main_min.css': ['<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>normalize.css', '<%= dir.dev %><%= dir.projectRoot %><%= dir.css %>main.css']
        }
      }
    },
    
    //JSのミニファイ
    uglify: {
      js: {
        files: {
          '<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>script_min.js': ['<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>script_a.js', '<%= dir.dev %><%= dir.projectRoot %><%= dir.js %>script_b.js']
        }
      }
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
      grunt.file.mkdir('htdocs');
      grunt.file.mkdir('htdocs/_dev');
      grunt.file.mkdir('htdocs/_dev/assets');
      grunt.file.mkdir('htdocs/_dev/assets/css');
      grunt.file.mkdir('htdocs/_dev/assets/img');
      grunt.file.mkdir('htdocs/_dev/assets/_scss');
//    grunt.file.mkdir('htdocs/_dev/assets/_coffee');
      grunt.file.mkdir('htdocs/_dev/assets/js');
      grunt.file.mkdir('htdocs/_dev/assets/js/components');
      grunt.file.mkdir('htdocs/release');
      grunt.file.mkdir('htdocs/release/assets');
      grunt.file.mkdir('htdocs/release/assets/css');
      grunt.file.mkdir('htdocs/release/assets/img');
      grunt.file.mkdir('htdocs/release/assets/js');
      grunt.file.mkdir('htdocs/release/assets/js/components');
//    return grunt.task.run('clean:init');
    }
  );
  
  //gruntでローカルサーバーと監視
  grunt.registerTask("default", [
    'compass',
    'connect:livereload',
    'watch'
  ]);
  
  //releaseでJS、CSSのミニファイ、release以下にコピー
  return grunt.registerTask("release", [
    'clean:build',
    'copy:build',
    'uglify',
    'cssmin'
  ]);
};
