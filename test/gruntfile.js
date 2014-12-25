module.exports = function(grunt) {
  
  grunt.initConfig({
    
    //ディレクトリの定義
    dir: {
      dev:    'htdocs/_dev/',
      release:'htdocs/release/',
      //coffee: 'assets/_coffee/',
      js:     'assets/js/',
      assets: 'assets/js/components/',
      scss:   'assets/_scss/',
      css:    'assets/css/',
      img:    'assets/img/'
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
            dest: '<%= dir.dev %><%= dir.assets %>',
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: '_lib/html5-boilerplate/js/vendor/',
            src: ["**/modernizr*.js"],
            dest: '<%= dir.dev %><%= dir.assets %>',
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
            dest: '<%= dir.dev %><%= dir.scss %>',
            filter: 'isFile',
            dot: false,
            rename: function(dest, src) {
            return dest + 'main.scss';
            }
          }, {
            expand: true,
            cwd: '_lib/normalize-scss/',
            src: ["*"],
            dest: '<%= dir.dev %><%= dir.scss %>',
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
            cwd: "<%= dir.dev %><%= dir.css %>",
            src: ["**/*.css"],
            dest: "<%= dir.release %><%= dir.css %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.img %>",
            src: ["**/*.{gif,jpeg,jpg,png,svg,webp}"],
            dest: "<%= dir.release %><%= dir.img %>",
            filter: 'isFile',
            dot: false
          }, {
            expand: true,
            cwd: "<%= dir.dev %><%= dir.js %>",
            src: ["**/*.js"],
            dest: "<%= dir.release %><%= dir.js %>",
            filter: 'isFile',
            dot: false
          }
        ]
      }
    },
    
    //SASSコンパイル
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [
          {
            expand: true,
            cwd: '<%= dir.dev %><%= dir.scss %>',
            src: ['*.scss'],
            dest: '<%= dir.dev %><%= dir.css %>',
            ext: '.css'
          }
        ]
      }
    },
    
//    //cofeeコンパイル
//    coffee: {
//      options: {
//        bare: true
//      },
//      files: {
//        expand: true,
//        cwd: "<%= dir.dev %><%= dir.coffee %>",
//        src: ["**/*.coffee"],
//        dest: "<%= dir.dev %><%= dir.js %>",
//        ext: ".js"
//      }
//    },


    //コマンド　gurnt
    //ローカルサーバー起動
    connect: {
      server: {
        options: {
          port: 9999,
          base: '<%= dir.dev %>'
        }
      }
    },
    
    //_dev以下の監視
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: "<%= dir.dev %>**/*.html"
      },
      sass: {
        files: "<%= dir.dev %><%= dir.scss %>**/*.scss",
        tasks: ["sass"]
      },
      js: {
        files: "<%= dir.dev %><%= dir.js %>**/*.js",
//        tasks: ['coffee']
      }
    },


    //コマンド　grunt release（すべてではない）
    //_libを削除,release以下に納品ファイルまとめ
    clean: {
      init: ["_lib/"],
      build: ["<%= dir.release %>"]
    },
    
    //CSSミニファイ
    cssmin: {
      combine: {
        files: {
          '<%= dir.dev %><%= dir.css %>main_min.css': ['<%= dir.dev %><%= dir.css %>normalize.css', '<%= dir.dev %><%= dir.css %>main.css']
        }
      }
    },
    
    //JSのミニファイ
    uglify: {
      js: {
        files: {
          '<%= dir.dev %><%= dir.js %>script_min.js': ['<%= dir.dev %><%= dir.js %>script_a.js', '<%= dir.dev %><%= dir.js %>script_b.js']
        }
      }
    }
    
  });
  
  
  
  //タスクをすべて読み込む
  require('load-grunt-tasks')(grunt);
  
  //grunt initでbowerインストール＆コピー、もろもろディレクトリ構築
  grunt.registerTask("init", function() {
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
  });
  
  //gruntでローカルサーバーと監視
  grunt.registerTask("default", ['connect', 'watch']);
  
  //releaseでJS、CSSのミニファイ、release以下にコピー
  return grunt.registerTask("release", ['uglify', 'cssmin', 'clean:build', 'copy:build']);
};
